import { createSlice } from "@reduxjs/toolkit";
import { Board } from "constants/board";

const boards: Board[] = JSON.parse(localStorage.getItem("board")!) || [];

const boardSlice = createSlice({
  name: "board",
  initialState: { boards },
  reducers: {
    getboardsByBoardId: (state) => {
      // filter
      state.boards = [...state.boards];
    },
    createABoard: (state, action) => {
      state.boards = [...state.boards, action.payload];
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    updateABoard: (state, action) => {
      state.boards = [...action.payload];
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    removeABoard: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload.id
      );
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    removeATask: (state, action) => {
      const { boardId, columnId, taskId } = action.payload;
      state.boards.map((board) =>
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
    // createATask: (state, action) => {
    //   console.log("Data: ", action.payload);
    //   state.boards = [...action.payload];
    //   localStorage.setItem("board", JSON.stringify(state.boards));
    // },
    // createAColumn: (state, action) => {
    //   state.boards = [...action.payload];
    //   localStorage.setItem("board", JSON.stringify(state.boards));
    // },
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
  removeATask,
  removeAllBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
