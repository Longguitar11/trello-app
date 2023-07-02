import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Board } from "constants/board";
import { Columns } from "constants/columns";
import { Task } from "constants/task";

type BoardStore = Omit<Board, "columns"> & {
  columnIds: number[];
};

type ColumnStore = Omit<Columns, "tasks"> & {
  taskIds: number[];
};

type TaskStore = Record<string | number, Task>;

type AppStore = {
  columns: Record<number, ColumnStore>;
  tasks: TaskStore;
  boards: {
    ids: number[];
    entities: Record<number, BoardStore>;
  };
};

const defaultState: AppStore = {
  boards: {
    ids: [],
    entities: {},
  },
  columns: {},
  tasks: {},
};

const getInitialState = () => {
  try {
    const savedState = localStorage.getItem("board");

    return savedState ? (JSON.parse(savedState) as AppStore) : defaultState;
  } catch {
    return defaultState;
  }
};

const appSlice = createSlice({
  name: "tasks",
  initialState: getInitialState(),
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      // add to task store
      state.tasks[action.payload.id] = action.payload;

      // get column
      const column = state.columns[parseInt(action.payload.status)];

      // add task id to column
      column?.taskIds.push(action.payload.id);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const oldColumnId = state.tasks[action.payload.id].status;

      if (action.payload.status !== oldColumnId) {
        // remove from old column
        const oldColumn = state.columns[parseInt(oldColumnId)];

        oldColumn.taskIds = oldColumn.taskIds.filter(
          (id) => id !== action.payload.id
        );

        // add to new column
        const newColumn = state.columns[parseInt(action.payload.status)];

        newColumn.taskIds.push(action.payload.id);
      }

      // set to task store
      state.tasks[action.payload.id] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<Task>) => {
      console.log("delete data ", action.payload);

      // get column
      const column = state.columns[+action.payload.status];

      // remove task id from column
      column.taskIds = column.taskIds.filter(
        (id) => id !== action.payload.id
      );

      // delete from task store
      // delete state.tasks[action.payload.id];
    },
    addColumn: (
      state,
      action: PayloadAction<{
        boardId: number;
        column: Omit<Columns, "tasks">;
      }>
    ) => {
      // add to task store
      state.columns[action.payload.column.id] = {
        ...action.payload.column,
        taskIds: [],
      };

      // add column id to board
      const board = state.boards.entities[action.payload.boardId];
      board?.columnIds.push(action.payload.column.id);
    },
    deleteColumn: (
      state,
      action: PayloadAction<{
        boardId: number;
        columnId: number;
      }>
    ) => {
      const board = state.boards.entities[action.payload.boardId];

      if (!board) return;

      board.columnIds = board.columnIds.filter(
        (id) => id !== action.payload.columnId
      );

      // delete column
      delete state.columns[action.payload.columnId];
    },
    updateColumnTaskIds: (
      state,
      action: PayloadAction<{
        columnId: number;
        taskIds: number[];
      }>
    ) => {
      // update column taskIds
      state.columns[action.payload.columnId].taskIds = action.payload.taskIds;

      // update task status
      action.payload.taskIds.forEach((taskId) => {
        state.tasks[taskId].status = action.payload.columnId.toString();
      });
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{
        columnId: number;
        taskId: number
      }>
    ) => {

      const oldColumnId = state.tasks[action.payload.taskId].status

      // remove from old column
      const oldColumn = state.columns[parseInt(oldColumnId)];

      oldColumn.taskIds = oldColumn.taskIds.filter(
        (id) => id !== action.payload.taskId
      );

      const newColumnId =  action.payload.columnId.toString();

      // add to new column
      state.tasks[action.payload.taskId].status = action.payload.columnId.toString();

      const newColumn = state.columns[parseInt(newColumnId)];

      newColumn.taskIds.push(action.payload.taskId);
    },
    updateBoardColumnsOrder: (
      state,
      action: PayloadAction<{
        boardId: number;
        columnIds: number[];
      }>
    ) => {
      // update to board columns
      state.boards.entities[action.payload.boardId].columnIds =
        action.payload.columnIds;
    },
    addBoard: (state, action: PayloadAction<Board>) => {
      // add columns
      action.payload.columns.forEach((column) => {
        state.columns[column.id] = {
          ...column,
          taskIds: [],
        };
      });

      // add to board entities
      state.boards.entities[action.payload.id] = {
        ...action.payload,
        columnIds: action.payload.columns.map((column) => column.id),
      };

      // add board id
      state.boards.ids.push(action.payload.id);
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      // update columns
      action.payload.columns.forEach((column) => {
        state.columns[column.id] = {
          ...column,
          taskIds: state.columns[column.id]?.taskIds || [],
        };
      });

      // update to board store
      state.boards.entities[action.payload.id] = {
        ...action.payload,
        columnIds: action.payload.columns.map((column) => column.id),
      };
    },
    deleteBoard: (state, action: PayloadAction<Board>) => {
      // get board
      const board = state.boards.entities[action.payload.id];

      // loop though columnIds and delete tasks
      board?.columnIds.forEach((columnId) => {
        const column = state.columns[columnId];
        column?.taskIds.forEach((taskId) => {
          delete state.tasks[taskId];
        });

        // delete column
        delete state.columns[columnId];
      });

      // delete board id
      state.boards.ids = state.boards.ids.filter(
        (id) => id !== action.payload.id
      );

      // delete board
      delete state.boards.entities[action.payload.id];
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  addColumn,
  deleteColumn,
  updateColumnTaskIds,
  updateTaskStatus,
  updateBoardColumnsOrder,
  addBoard,
  updateBoard,
  deleteBoard,
} = appSlice.actions;

export default appSlice.reducer;
