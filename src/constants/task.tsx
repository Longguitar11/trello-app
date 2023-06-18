export type Subtask = {
  id: number;
  title: string;
  isDone: boolean;
};

export type Task = {
  id: number;
  title: string;
  desc: string;
  subtasks: Subtask[];
  status: string;
};
