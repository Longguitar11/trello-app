import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Label } from "../ui";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Board } from "constants/board";
import { createATask } from "redux/boardSlice";
import { useParams } from "react-router-dom";

const TaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  desc: z.string().min(1, { message: "Description is required" }),
  subtasks: z.array(
    z.object({
      id: z.number(),
      title: z.string().min(1, { message: "Title of subtask cannot be empty" }),
    })
  ),
  status: z
    .string()
    .min(1, {
      message: "The character length of status must be greater than 1",
    }),
});

export type TaskForm = z.infer<typeof TaskSchema>;

export type TaskFormProps = {
  onSubmit?: (task: TaskForm) => void;
  mode?: "create" | "edit";
  submitting?: boolean;
  submitText?: string;
  submittingText?: string;
  initialData?: Partial<TaskForm>;
  setIsShowModal: (value: boolean) => void;
  // boards?: Board;
};

const CreateTask = ({
  onSubmit,
  initialData = { subtasks: [{ id: 0, title: "" }], status: "todo" },
  setIsShowModal,
}: // boards,
TaskFormProps) => {
  const dispatch = useDispatch();

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  );

  const boardCopied = [...boardList];

  let { boardId } = useParams();

  const boards = boardCopied.find((board) => board.id === parseInt(boardId!));

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(TaskSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  // use useFieldArray for subtasks
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  onSubmit = (task: TaskForm) => {
    // Find index of column to find task correctly
    let index = boards?.columns.findIndex(
      (column) => column.name === task.status
    );

    // the task will be appended to corresponding to its column
    const output = {
      ...task,
      id: boards ? boards?.columns[`${index!}`]?.tasks.length : 0,
    };

    // Find Column need update
    const selectedColumn = boards?.columns?.find(
      (column) => column?.name === task.status
    );

    // If column exist, continue...
    if (selectedColumn) {
      // copy task
      let copiedTask = [...selectedColumn.tasks];
      // assign copied task with new value
      copiedTask = [...copiedTask, output];
      console.log(copiedTask);
      // add task to redux
      dispatch(
        createATask(
          boardList.map((board) =>
            board.id === boards?.id
              ? {
                  ...board,
                  columns: board.columns.map((column) =>
                    column.id === index
                      ? { ...column, tasks: copiedTask }
                      : column
                  ),
                }
              : board
          )
        )
      );
    }

    setIsShowModal(false);
  };

  return (
    <form
      className="flex flex-col gap-y-6 rounded-[6px] bg-white p-8 w-[480px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="">Add New Task</h2>
      <div className="space-y-2">
        <Label className="text-sm font-bold" htmlFor="title">
          Title
        </Label>
        <Input
          id="title"
          {...register("title", { required: true })}
          placeholder="e.g. Learn English"
        />
        {errors.title && (
          <p className="text-red" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-bold" htmlFor="desc">
          Description
        </Label>
        <Textarea
          {...register("desc", { required: true })}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          id="desc"
        />
        {errors.desc && (
          <p className="text-red" role="alert">
            {errors.desc.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-bold" htmlFor="subtasks">
          Subtasks
        </Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-x-4 items-center">
            <Input
              {...register(`subtasks.${index}.title`)}
              id="subtasks"
              type="text"
              placeholder="e.g. Make coffee"
            />
            <img
              onClick={() => remove(index)}
              className="w-4 h-4 cursor-pointer"
              src="./imgs/icon-cross.svg"
              alt="cross"
            />
          </div>
        ))}
        {errors.subtasks && (
          <p className="text-red" role="alert">
            The title of subtask cannot be empty
          </p>
        )}

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => append({ id: fields.length, title: "" })}
        >
          +Add New Subtask
        </Button>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-bold" htmlFor="status">
          Status
        </Label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              // defaultValue={boards && boards?.columns[0].name}
              value={field.value}
              onValueChange={(value) => {
                field.onChange({
                  target: {
                    value: value,
                  },
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the status of the task" />
              </SelectTrigger>
              <SelectContent>
                {boards?.columns.map((column) => (
                  <SelectItem key={column.id} value={column.name}>
                    {column.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-red" role="alert">
            {errors.status.message}
          </p>
        )}
      </div>
      <Button className="w-full" type="submit">
        Create Task
      </Button>
    </form>
  );
};

export default CreateTask;
