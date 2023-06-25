import { Board } from "constants/board";
import { useAppSelector } from "./redux";

export const useBoard = (boardId?: number) => useAppSelector(
  (state) => {

    if (boardId === undefined) {
      return null
    }

    const board  = state.boardStore.boards.entities[boardId]

    if (!board) {
      return null
    }

    return {
      id: board.id,
      name: board.name,
      columns: board.columnIds.map(columnId => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const column = state.boardStore.columns[columnId]

        return {
          id: column.id,
          name: column.name,
          tasks: column.taskIds.map(taskId => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
  }
) ;