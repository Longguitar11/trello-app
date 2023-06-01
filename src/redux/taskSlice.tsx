import { createSlice } from '@reduxjs/toolkit'
import { Task } from 'constants/task'

const initialState: Task[] = JSON.parse(localStorage.getItem('task')!) || []

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getAllTasks: (state) => {
      state = [...state] 
    },
    createATask: (state, action) => {
      state = [...state, action.payload]
      localStorage.setItem('task', JSON.stringify(state))
    }
  }
})

export const { getAllTasks, createATask } = taskSlice.actions
export default taskSlice.reducer

