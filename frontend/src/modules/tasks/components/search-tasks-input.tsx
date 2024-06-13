import { useAppSelector, useAppDispatch } from "@/store";
import {
  filterTasksOnSearch,
  resetAllTasksData,
} from "@/modules/tasks/store/tasks-slice";

import {
  type TaskType,
  type AllTasksDataType,
} from "@/modules/tasks/types/task-types";

export default function SearchTasksInput() {
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
