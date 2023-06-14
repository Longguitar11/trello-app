import { createSlice } from "@reduxjs/toolkit";
import { Board } from "constants/board";

const boards: Board[] = JSON.parse(localStorage.getItem("board")!) || [];

const boardSlice = createSlice({
  name: "board",
  initialState: { boards },
  reducers: {
    getboardsByBoardId: (state, action) => {
      // filter
      state.boards = [...state.boards];
    },
    createABoard: (state, action) => {
      state.boards = [...state.boards, action.payload];
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    createATask: (state, action) => {
      console.log("Data: ", action.payload);
      state.boards = [...action.payload];
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    createAColumn: (state, action) => {
      state.boards = [...action.payload];
      localStorage.setItem("board", JSON.stringify(state.boards));
    },
    removeAllBoard: (state) => {
      state.boards = [];
      localStorage.removeItem("board");
    },
  },
});

export const { createABoard, createATask, createAColumn, removeAllBoard } =
  boardSlice.actions;
export default boardSlice.reducer;
