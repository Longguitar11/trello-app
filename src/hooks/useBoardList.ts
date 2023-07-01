import { Board } from "constants/board";
import { useAppSelector } from "./redux";

export const useBoardList = () => useAppSelector(
  (state) => state.boardStore.boards.ids.map((id) => {
    const boardStore = state.boardStore.boards.entities[id]

    return {
      id: boardStore.id,
      name: boardStore.name,
      columns: boardStore.columnIds.map(columnId => {
        const column = state.boardStore.columns[columnId]

        return {
          id: column.id,
          name: column.name,
          tasks: column.taskIds.map(taskId => {
            const task = state.boardStore.tasks[taskId]

            return {
              id: task.id,
              title: task.title,
              desc: task.desc,
              status: task.status,
              subtasks: task.subtasks,
            }
          })
        }
      })
    } satisfies Board
  }).filter(board => board !== null) as Board[]
) ;