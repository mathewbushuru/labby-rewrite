import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type TaskType = {
  id: string;
  taskName: string;
};

type TasksColumnType = {
  id: string;
  title: string;
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
      title: "To Do",
      taskIds: ["task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: ["task-1", "task-2"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-5"],
    },
    "column-4": {
      id: "column-4",
      title: "Backlog",
      taskIds: [],
    },
  },
  columnIdsOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default function TasksPage() {
  const [dndData, _setDndData] = useState<DragDropDataType>(initialDndData);

  const dragStartHandler = () => {
    console.log("Drag start");
  };
  const dragUpdateHandler = () => {
    console.log("Drag update");
  };
  const dragEndHandler = () => {
    console.log("Drag end");
  };

  return (
    <div className="">
      Tasks
      <DragDropContext
        onDragStart={dragStartHandler}
        onDragUpdate={dragUpdateHandler}
        onDragEnd={dragEndHandler}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="m-8 flex justify-between rounded-sm border border-sky-200"
            >
              {dndData.columnIdsOrder.map((columnId, index) => {
                const columnData = dndData.columns[columnId];
                const allTasksInColumn = columnData.taskIds.map(
                  (taskId) => dndData.tasks[taskId],
                );
                return (
                  <TaskColumn
                    key={columnId}
                    columnData={columnData}
                    allTasksInColumn={allTasksInColumn}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

function TaskColumn({
  columnData,
  allTasksInColumn,
  index,
}: {
  columnData: TasksColumnType;
  allTasksInColumn: TaskType[];
  index: number;
}) {
  return (
    <Draggable draggableId={columnData.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="m-4 flex-1 rounded-md border border-sky-100 bg-sky-50 p-4"
        >
          <h3 className="mb-2 font-semibold" {...provided.dragHandleProps}>
            {columnData.title}
          </h3>
          <Droppable
            droppableId={columnData.id}
            direction="vertical"
            type="task"
          >
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
      )}
    </Draggable>
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
