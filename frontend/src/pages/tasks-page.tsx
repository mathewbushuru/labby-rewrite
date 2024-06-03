import { useState } from "react";
import { toast } from "sonner";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DragStart,
  type DragUpdate,
  type DropResult,
} from "@hello-pangea/dnd";

import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  setAllTasksData,
  resetAllTasksData,
  addNewTask,
  updateTaskName,
} from "@/store/features/tasks-slice";

import SideNavbar from "@/components/side-navbar";
import { PrimaryButton, OutlineButton } from "@/components/ui/button";
import { PrimaryInput } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
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
  type TasksColumnType,
  type AllTasksDataType,
} from "@/types/tasks";
import { DialogClose } from "@radix-ui/react-dialog";

export default function TasksPage() {
  const [showMobileSideNavbar, setShowMobileSideNavbar] = useState(false);
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
          <h1 className="text-3xl font-bold tracking-wide">Tasks</h1>
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
      if (currTask.taskName.toLowerCase().includes(searchTerm)) {
        filteredTasks[taskId] = currTask;
      }
    }

    const filteredColumns = { ...allTasksData.columns };
    for (let columnId in filteredColumns) {
      filteredColumns[columnId] = {
        ...filteredColumns[columnId],
        taskIds: filteredColumns[columnId].taskIds.filter((taskId) =>
          filteredTasks.hasOwnProperty(taskId),
        ),
      };
    }

    const filteredAllTasksData = {
      ...allTasksData,
      tasks: filteredTasks,
      columns: filteredColumns,
    };

    dispatch(setAllTasksData(filteredAllTasksData));
  };

  return (
    <form className="relative flex max-w-2xl flex-1 gap-4">
      <img src="/SearchIcon.svg" className="absolute left-2.5 top-2.5 h-5" />
      <input
        className="h-10 w-full rounded-md bg-primaryWhite pl-10 pr-4 outline-none"
        placeholder="Search..."
        type="search"
        onChange={handleSearch}
      />
    </form>
  );
}

function NewTask() {
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState("");
  const [taskCategoryId, setTaskCategoryId] = useState("adopt-me");

  const handleAddNewTask = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!taskName || taskName.length === 0) {
      toast.error("Add task error", {
        description: "Task name is required.",
      });
      return;
    }

    dispatch(addNewTask({ taskName, taskCategoryId }));
    toast.success(`'${taskName}' task added successfully.`);
    setTaskName("");
    setTaskCategoryId("adopt-me");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton>New Task</PrimaryButton>
      </DialogTrigger>
      <DialogContent>
        <h3 className="text-xl font-bold tracking-wide">Add new task</h3>
        <PrimaryInput
          placeholder="Task name..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          autoFocus
        />
        <Select
          value={taskCategoryId}
          onValueChange={(newValue) => setTaskCategoryId(newValue)}
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

  const dragStartHandler = (dragStartData: DragStart) => {
    const { draggableId, source } = dragStartData;

    const taskName = allTasksData.tasks[draggableId].taskName;
    const sourceColumnName = allTasksData.columns[source.droppableId].name;

    toast.info("Drag start", {
      description: `'${taskName}' task from column '${sourceColumnName}'.`,
    });
  };

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

    const sourceColumn = allTasksData.columns[source.droppableId];
    const destinationColumn = allTasksData.columns[destination.droppableId];

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
        columns: {
          ...allTasksData.columns,
          [updatedColumnData.id]: updatedColumnData,
        },
      };

      dispatch(setAllTasksData(updatedDndData));
      toast.success("Drag end", {
        description: `'${taskName}' task from position ${source.index + 1} to position ${destination.index + 1}.`,
      });
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
        columns: {
          ...allTasksData.columns,
          [updatedSourceColumnData.id]: updatedSourceColumnData,
          [updatedDestinationColumnData.id]: updatedDestinationColumnData,
        },
      };

      dispatch(setAllTasksData(updatedDndData));
      toast.success("Drag end", {
        description: `'${taskName}' task from '${sourceColumn.name}' to '${destinationColumn.name}'.`,
      });
    }
  };
  return (
    <DragDropContext
      onDragStart={dragStartHandler}
      onDragUpdate={dragUpdateHandler}
      onDragEnd={dragEndHandler}
    >
      <div className="flex flex-col  gap-4 rounded-sm sm:flex-row sm:justify-between">
        {allTasksData.columnIdsOrder.map((columnId) => {
          const columnData = allTasksData.columns[columnId];
          const allTasksInColumn = columnData.taskIds.map(
            (taskId) => allTasksData.tasks[taskId],
          );
          return (
            <TaskColumn
              key={columnId}
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
  columnData: TasksColumnType;
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
              <Task key={taskData.id} taskData={taskData} index={index} />
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
  const taskColourId = taskData.taskColourId;
  const handleUpdateTaskData = () => {
    dispatch(updateTaskName({ taskId: taskData.id, taskName }));
  };
  return (
    <Draggable draggableId={taskData.id} index={index}>
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
                className={`w-2 ${taskColourId === 1 ? "bg-task1" : taskColourId === 2 ? "bg-task2" : taskColourId === 3 ? "bg-task3" : taskColourId === 4 ? "bg-task4" : "bg-task5"} `}
              >
                &nbsp;
              </div>
              <div className="space-y-1 p-4">
                <div className="text-sm font-semibold text-darkGray">
                  {taskData.id.toUpperCase()}
                </div>
                <div className="text-sm">{taskData.taskName}</div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-xl font-bold tracking-wide">
              {taskData.id.toUpperCase()}
            </h3>
            <PrimaryInput
              placeholder="Task name..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              autoFocus
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
