import { useState } from "react";
import { toast } from "sonner";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DragStart,
  type DragUpdate,
  type DropResult,
} from "@hello-pangea/dnd";

import {
  useLoadAllTasksQuery,
  useCreateTaskMutation,
} from "@/modules/tasks/api/task-api";
import { useAppSelector, useAppDispatch } from "@/store";
import {
  setAllTasksData,
  resetAllTasksData,
  filterTasksOnSearch,
  updateTaskData,
} from "@/modules/tasks/store/tasks-slice";

import { isServerErrorResponse } from "@/lib/utils";

import SideNavbar from "@/components/side-navbar";
import { PrimaryButton, OutlineButton } from "@/components/ui/button";
import { PrimaryInput, TextArea } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  type TaskType,
  type TaskCategoryType,
  type AllTasksDataType,
} from "@/modules/tasks/types/task-types";

export default function TasksPage() {
  const [showMobileSideNavbar, setShowMobileSideNavbar] = useState(false);

  const { isLoading } = useLoadAllTasksQuery();

  return (
    <div className="flex h-screen items-start">
      <div
        className={`${showMobileSideNavbar ? "inline-block" : "hidden"} h-full sm:inline-block`}
      >
        <SideNavbar />
      </div>
      <div
        className={`h-full flex-1 space-y-6 overflow-y-auto py-9 sm:py-10 ${showMobileSideNavbar ? "px-4" : "px-8"}`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Tasks {isLoading && <span className="text-xs">Loading...</span>}
          </h1>
          <img
            src="/Hamburger.svg"
            className="h-6 w-6 sm:hidden"
            onClick={() => setShowMobileSideNavbar((curr) => !curr)}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchTasks />
          <NewTask />
        </div>
        <TasksBoard />
      </div>
    </div>
  );
}

function SearchTasks() {
  const dispatch = useAppDispatch();
  const allTasksData = useAppSelector((state) => state.tasks);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm || searchTerm.length === 0) {
      dispatch(resetAllTasksData());
      return;
    }

    const filteredTasks: Record<string, TaskType> = {};
    let currTask;
    for (let taskId in allTasksData.tasks) {
      currTask = allTasksData.tasks[taskId];
      if (
        currTask.taskName.toLowerCase().includes(searchTerm) ||
        currTask.taskDescription.toLowerCase().includes(searchTerm) ||
        `task - ${currTask.taskId}`.includes(searchTerm)
      ) {
        filteredTasks[taskId] = currTask;
      }
    }

    const filteredTaskCategories = { ...allTasksData.taskCategories };
    for (let taskCategoryId in filteredTaskCategories) {
      filteredTaskCategories[taskCategoryId] = {
        ...filteredTaskCategories[taskCategoryId],
        taskIds: filteredTaskCategories[taskCategoryId].taskIds.filter(
          (taskId) => filteredTasks.hasOwnProperty(taskId),
        ),
      };
    }

    const filteredAllTasksData: AllTasksDataType = {
      ...allTasksData,
      tasks: filteredTasks,
      taskCategories: filteredTaskCategories,
    };

    dispatch(filterTasksOnSearch(filteredAllTasksData));
  };

  const handleResetBoardOnBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      dispatch(resetAllTasksData());
      return;
    }
  };

  return (
    <form className="relative flex max-w-2xl flex-1 gap-4">
      <img src="/SearchIcon.svg" className="absolute left-2.5 top-2.5 h-5" />
      <input
        className="h-10 w-full rounded-md bg-primaryWhite pl-10 pr-4 outline-none"
        placeholder="Search..."
        type="search"
        onChange={handleSearch}
        onKeyDown={handleResetBoardOnBackspace}
        autoFocus
      />
    </form>
  );
}

function NewTask() {
  const userId = useAppSelector((state) => state.auth.user?.userId)!;

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] =
    useState<TaskType["taskCategory"]>("adopt-me");

  const [createTaskTrigger, { isLoading }] = useCreateTaskMutation();

  const handleAddNewTask = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      if (!taskName || taskName.length === 0) {
        toast.error("Add task error", {
          description: "Task name is required.",
        });
        return;
      }

      const newTaskData = {
        taskName,
        taskCategory,
        taskDescription,
        taskCreatorId: userId,
        taskColourId: Math.floor(Math.random() * 5 + 1),
      };

      const createTaskResponse = await createTaskTrigger(newTaskData);

      if (createTaskResponse.error) {
        toast.error("Add task error", {
          description: isServerErrorResponse(createTaskResponse.error)
            ? createTaskResponse.error.data.errorMessage
            : "There was an error adding the task, try again.",
        });
        return;
      }

      toast.success(`'${taskName}' task added successfully.`);
    } catch (error: any) {
      console.error(error);
      toast.error("Add task error", {
        description: isServerErrorResponse(error)
          ? error.data.errorMessage
          : "There was an error adding the task, try again.",
      });
    } finally {
      setTaskName("");
      setTaskDescription("");
      setTaskCategory("adopt-me");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton disabled={isLoading}>
          {isLoading ? "Adding Task..." : "New Task"}
        </PrimaryButton>
      </DialogTrigger>
      <DialogContent>
        <h3 className="text-xl font-bold tracking-wide">Add new task</h3>
        <PrimaryInput
          placeholder="Task name..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          autoFocus
        />
        <TextArea
          placeholder="Task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <Select
          value={taskCategory}
          onValueChange={(newValue: TaskType["taskCategory"]) =>
            setTaskCategory(newValue)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select task category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="adopt-me">Adopt Me</SelectItem>
            <SelectItem value="to-do">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <OutlineButton>Cancel</OutlineButton>
          </DialogClose>
          <DialogClose asChild>
            <PrimaryButton onClick={handleAddNewTask}>Add</PrimaryButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TasksBoard() {
  const dispatch = useAppDispatch();

  const allTasksData = useAppSelector((state) => state.tasks);

  const dragStartHandler = (_dragStartData: DragStart) => {};

  const dragUpdateHandler = (_dragUpdateData: DragUpdate) => {};

  const dragEndHandler = (dropResultData: DropResult) => {
    const { draggableId: taskId, source, destination } = dropResultData;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index == source.index)
    ) {
      toast.error("Drag cancelled.");
      return;
    }

    const taskName = allTasksData.tasks[taskId].taskName;

    const sourceColumn = allTasksData.taskCategories[source.droppableId];
    const destinationColumn =
      allTasksData.taskCategories[destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const thisColumnsNewTaskIds = Array.from(sourceColumn.taskIds);

      thisColumnsNewTaskIds.splice(source.index, 1);
      thisColumnsNewTaskIds.splice(destination.index, 0, taskId);

      const updatedColumnData = {
        ...sourceColumn,
        taskIds: thisColumnsNewTaskIds,
      };

      const updatedDndData: AllTasksDataType = {
        ...allTasksData,
        taskCategories: {
          ...allTasksData.taskCategories,
          [updatedColumnData.id]: updatedColumnData,
        },
      };

      dispatch(setAllTasksData(updatedDndData));
      toast.success(
        `'${taskName}' task. '${sourceColumn.name}' position ${source.index + 1} -> Position ${destination.index + 1}.`,
      );
    } else {
      const sourceColumnTaskIds = Array.from(sourceColumn.taskIds);
      const destinationColumnTaskIds = Array.from(destinationColumn.taskIds);

      sourceColumnTaskIds.splice(source.index, 1);
      destinationColumnTaskIds.splice(destination.index, 0, taskId);

      const updatedSourceColumnData = {
        ...sourceColumn,
        taskIds: sourceColumnTaskIds,
      };
      const updatedDestinationColumnData = {
        ...destinationColumn,
        taskIds: destinationColumnTaskIds,
      };

      const updatedDndData: AllTasksDataType = {
        ...allTasksData,
        taskCategories: {
          ...allTasksData.taskCategories,
          [updatedSourceColumnData.id]: updatedSourceColumnData,
          [updatedDestinationColumnData.id]: updatedDestinationColumnData,
        },
      };

      dispatch(setAllTasksData(updatedDndData));
      toast.success(
        `'${taskName}' task. '${sourceColumn.name}' -> '${destinationColumn.name}'.`,
      );
    }
  };
  return (
    <DragDropContext
      onDragStart={dragStartHandler}
      onDragUpdate={dragUpdateHandler}
      onDragEnd={dragEndHandler}
    >
      <div className="flex flex-col  gap-4 rounded-sm sm:flex-row sm:justify-between">
        {allTasksData.taskCategoryIdsOrder.map((taskCategoryId) => {
          const columnData = allTasksData.taskCategories[taskCategoryId];
          const allTasksInColumn = columnData.taskIds.map(
            (taskId) => allTasksData.tasks[taskId],
          );
          return (
            <TaskColumn
              key={taskCategoryId}
              columnData={columnData}
              allTasksInColumn={allTasksInColumn}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}

function TaskColumn({
  columnData,
  allTasksInColumn,
}: {
  columnData: TaskCategoryType;
  allTasksInColumn: TaskType[];
}) {
  return (
    <div className="flex-1 rounded-md bg-primaryWhite p-4">
      <h3 className="mb-2 font-semibold">{columnData.name}</h3>
      <Droppable droppableId={columnData.id} direction="vertical" type="task">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`min-h-10 rounded-md sm:min-h-20 ${snapshot.isDraggingOver ? "bg-primaryLight opacity-20" : "bg-inherit"}`}
          >
            {allTasksInColumn.map((taskData, index) => (
              <Task key={taskData.taskId} taskData={taskData} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function Task({ taskData, index }: { taskData: TaskType; index: number }) {
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState(taskData.taskName);
  const [taskDescription, setTaskDescription] = useState(
    taskData.taskDescription,
  );

  const handleUpdateTaskData = () => {
    if (!taskName || taskName.length === 0) {
      toast.error("Update task error", {
        description: "Task name cannot be empty.",
      });
      setTaskName(taskData.taskName);
      return;
    }
    dispatch(
      updateTaskData({ taskId: taskData.taskId, taskName, taskDescription }),
    );
    toast.success(`'${taskName}' task updated successfully.`);
  };

  const taskColourId = taskData.taskColourId;

  return (
    <Draggable draggableId={`${taskData.taskId}`} index={index}>
      {(provided) => (
        <Dialog>
          <DialogTrigger asChild>
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="mb-2 flex overflow-hidden rounded-md bg-white"
            >
              <div
                className={`min-w-2 ${taskColourId === 1 ? "bg-task1" : taskColourId === 2 ? "bg-task2" : taskColourId === 3 ? "bg-task3" : taskColourId === 4 ? "bg-task4" : "bg-task5"} `}
              >
                &nbsp;
              </div>
              <div className="space-y-1 p-4">
                <div className="text-sm font-semibold text-darkGray">
                  TASK - {taskData.taskId}
                </div>
                <div className="text-sm">{taskData.taskName}</div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-xl font-bold tracking-wide">
              TASK - {taskData.taskId}
            </h3>
            <PrimaryInput
              placeholder="Task name..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              autoFocus
            />
            <TextArea
              placeholder="Task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <DialogFooter>
              <DialogClose asChild>
                <OutlineButton>Cancel</OutlineButton>
              </DialogClose>
              <DialogClose asChild>
                <PrimaryButton onClick={handleUpdateTaskData}>
                  Update
                </PrimaryButton>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Draggable>
  );
}