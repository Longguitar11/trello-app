import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Board } from "constants/board";
import { Task } from "constants/task";

const boards: Board[] = JSON.parse(localStorage.getItem("board")!) || [];

const boardSlice = createSlice({
  name: "board",
  initialState: { boards },
  reducers: {
    createABoard: (state, action) => {
      state.boards.push(action.payload);
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    updateABoard: (state, action) => {
      state.boards = action.payload
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    removeABoard: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload.id
      );
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    updateATask: (
      state,
      action: PayloadAction<{ boardId: number; columnId: number; task: Task }>
    ) => {
      const {boardId, columnId, task} = action.payload
      state.boards = state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      tasks: col.tasks.map(t => t.id === task.id ? {...task} : t),
                    }
                  : col
              ),
            }
          : board
      );
      console.log('edit task ', state.boards)
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    removeATask: (
      state,
      action: PayloadAction<{
        boardId?: number;
        columnId?: number;
        taskId?: number;
      }>
    ) => {
      const { boardId, columnId, taskId } = action.payload;
      state.boards = state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      tasks: col.tasks.filter((task) => task.id !== taskId),
                    }
                  : col
              ),
            }
          : board
      );
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    
    removeAllBoard: (state) => {
      state.boards = [];
      localStorage.removeItem("board");
    },
  },
});

export const {
  createABoard,
  updateABoard,
  removeABoard,
  updateATask,
  removeATask,
  removeAllBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
