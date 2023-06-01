// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { Input, Label } from "../ui";
import { Textarea } from "../ui/textarea";
import Dropdown from "../Dropdown";
import { useDispatch } from "react-redux";

// const TaskSchema = z.object({
//   title: z.string().min(1, { message: "Title is required" }),
//   desc: z.string().min(1, { message: "Description is required" }),
//   subtask: z.string(),
//   status: z.enum(["Toto", "Doing", "Done"]),
// });

// export type TaskForm = z.infer<typeof TaskSchema>;

// export type TaskFormProps = {
//   onSubmit: (task: TaskForm) => void;
//   mode?: "create" | "edit";
//   submitting?: boolean;
//   submitText?: string;
//   submittingText?: string;
//   initialData?: Partial<TaskForm>;
// };

const CreateTask = () => {
  const dispatch = useDispatch()

  return (
    <>
        <p className="heading-l">Add New Task</p>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" id="title" type="text" placeholder="e.g. Take coffee break" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
          name="desc"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            id="desc"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtasks">Subtasks</Label>
          <div className="flex gap-x-4 items-center">
            <Input name="subtask" id="subtasks" type="text" placeholder="e.g. Make coffee" />
            <img
              className="w-4 h-4 cursor-pointer"
              src="./imgs/icon-cross.svg"
              alt="cross"
            />
          </div>
          <div className="flex gap-x-4 items-center">
            <Input
              name="subtask"
              id="subtasks2"
              type="text"
              placeholder="e.g. Drink coffee & Smile"
            />
            <img
              className="w-4 h-4 cursor-pointer"
              src="./imgs/icon-cross.svg"
              alt="cross"
            />
          </div>
          <button className="w-full rounded-[20px] bg-slate-100 py-2 heading-m text-purple">
            +Add New Subtask
          </button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Dropdown />
        </div>
        <button className="btn-pri-s hover:btn-pri-s-hover w-full transition-all duration-200">
          Create Task
        </button>
    </>
  )
}

export default CreateTask