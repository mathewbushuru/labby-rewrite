import { useState } from "react";

import { useLoadAllTasksQuery } from "@/modules/tasks/api/task-api";

import SideNavbar from "@/components/side-navbar";
import TaskBoard from "@/modules/tasks/components/task-board";
import SearchTasksInput from "@/modules/tasks/components/search-tasks-input";
import NewTaskModal from "@/modules/tasks/components/new-task-modal";

export default function TaskPage() {
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
          <SearchTasksInput />
          <NewTaskModal />
        </div>
        <TaskBoard />
      </div>
    </div>
  );
}
