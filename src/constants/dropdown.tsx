export type Dropdown = {
  id: number;
  name: string;
  style: string
};

export const EditAndDelBoard: Dropdown[] = [
  { id: 0, name: "Edit Board", style: 'text-grey' },
  { id: 1, name: "Delete Board", style: 'text-red' },
];

export const EditAndDelTask: Dropdown[] = [
  { id: 0, name: "Edit Task", style: 'text-grey' },
  { id: 1, name: "Delete Task", style: 'text-red' },
];
