import { useAppSelector } from "./redux";

export const useTask = (taskId?: number) => useAppSelector(
  (state) => {

    if (taskId === undefined) {
      return null
    }

    const task  = state.boardStore.tasks[taskId]

    if (!task) {
      return null
    }

    return task;
  }
) ;