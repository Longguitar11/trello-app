import { Task } from "./task"

export type Board = {
    id: number
    name: string
    columns: {
        id: number
        name: string
        tasks: Task[]
    }[]
}