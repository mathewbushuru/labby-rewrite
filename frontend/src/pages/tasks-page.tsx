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

import SideNavbar from "@/components/side-navbar";

type TaskType = {
  id: string;
  taskName: string;
};

type TasksColumnType = {
  id: string;
  name: string;
  taskIds: string[];
};

type DragDropDataType = {
  tasks: Record<string, TaskType>;
  columns: Record<string, TasksColumnType>;
  columnIdsOrder: string[];
};

const initialDndData: DragDropDataType = {
  tasks: {
    "task-1": { id: "task-1", taskName: "Acme Ecommerce App" },
    "task-2": { id: "task-2", taskName: "Checklists App" },
    "task-3": { id: "task-3", taskName: "Flix App" },
    "task-4": { id: "task-4", taskName: "Outfits App" },
    "task-5": { id: "task-5", taskName: "Battleship Game" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      name: "Adopt Me",
      taskIds: ["task-4"],
    },
    "column-2": {
      id: "column-2",
      name: "To Do",
      taskIds: ["task-3"],
    },
    "column-3": {
      id: "column-3",
      name: "In Progress",
      taskIds: ["task-1", "task-2"],
    },
    "column-4": {
      id: "column-4",
      name: "Completed",
      taskIds: ["task-5"],
    },
  },
  columnIdsOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default function TasksPage() {
  return (
    <div className="flex h-screen items-start">
      <SideNavbar />
      <div className="flex-1 mx-8 my-10 space-y-6">
        <h1 className="text-3xl font-bold tracking-wide">Tasks</h1>

        <div className="max-w-2xl relative">
          <img
            src="/SearchIcon.svg"
            className="absolute top-2.5 left-2.5 h-5"
          />
          <input 
            className="bg-primaryWhite h-10 pl-10 pr-4 w-full rounded-md outline-none"
            placeholder="Search..."
          />
        </div>

        <TasksBoard />
      </div>
    </div>
  );
}

function TasksBoard() {
  const [dndData, setDndData] = useState<DragDropDataType>(initialDndData);

  const dragStartHandler = (dragStartData: DragStart) => {
    const { draggableId, source } = dragStartData;

    const taskName = dndData.tasks[draggableId].taskName;
    const sourceColumnName = dndData.columns[source.droppableId].name;

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

    const taskName = dndData.tasks[taskId].taskName;

    const sourceColumn = dndData.columns[source.droppableId];
    const destinationColumn = dndData.columns[destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const thisColumnsNewTaskIds = Array.from(sourceColumn.taskIds);

      thisColumnsNewTaskIds.splice(source.index, 1);
      thisColumnsNewTaskIds.splice(destination.index, 0, taskId);

      const updatedColumnData = {
        ...sourceColumn,
        taskIds: thisColumnsNewTaskIds,
      };

      const updatedDndData = {
        ...dndData,
        columns: {
          ...dndData.columns,
          [updatedColumnData.id]: updatedColumnData,
        },
      };

      setDndData(updatedDndData);
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

      const updatedDndData = {
        ...dndData,
        columns: {
          ...dndData.columns,
          [updatedSourceColumnData.id]: updatedSourceColumnData,
          [updatedDestinationColumnData.id]: updatedDestinationColumnData,
        },
      };

      setDndData(updatedDndData);
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
      <div className="flex flex-col rounded-sm border border-sky-200 sm:flex-row sm:justify-between">
        {dndData.columnIdsOrder.map((columnId) => {
          const columnData = dndData.columns[columnId];
          const allTasksInColumn = columnData.taskIds.map(
            (taskId) => dndData.tasks[taskId],
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
    <div className="m-4 flex-1 rounded-md border border-sky-100 bg-sky-50 p-4">
      <h3 className="mb-2 font-semibold">{columnData.name}</h3>
      <Droppable droppableId={columnData.id} direction="vertical" type="task">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${snapshot.isDraggingOver ? "bg-emerald-50" : "bg-inherit"}`}
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
  return (
    <Draggable draggableId={taskData.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="mb-2 rounded-md bg-white p-2"
        >
          {taskData.taskName}
        </div>
      )}
    </Draggable>
  );
}
