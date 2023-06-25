import { Middleware, configureStore } from '@reduxjs/toolkit'
import boardSlice from './boardSlice'

// {
//   name: "board 1",
//   columns: [
//     {
//       name: "todo",
//       tasks: [
//         {
//           name: "task 1",
//         }
//       ]
//     }
//   ]
// }

// board = {
//   columns: [columnID1, columnID2, columnID3]
// }

// columns = {
//   columnId: {
//     name: "todo",
//     tasks: [taskId1, taskId2, taskId3]
//   }
// }

// tasks = {
//   taskId: {
//     name: "task 1",
//   }
// }

const saveToLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action)
  localStorage.setItem('board', JSON.stringify(store.getState().boardStore))
  return result
}

export const store = configureStore({
  reducer: { boardStore: boardSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch