export type Task = {
    id: number
    title: string
    desc: string
    subtasks: {id: number, title: string}[]
    status: string
}

