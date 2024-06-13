import { useState } from "react";
import { toast } from "sonner";

import { useAppSelector } from "@/store";
import { useCreateTaskMutation } from "@/modules/tasks/api/task-api";

import { isServerErrorResponse } from "@/lib/utils";

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

import { type TaskType } from "@/modules/tasks/types/task-types";

export default function NewTaskModal() {
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
