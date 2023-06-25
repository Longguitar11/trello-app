import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Label } from "../ui";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Board } from "constants/board";
import { updateABoard, updateATask } from "redux/boardSlice";
import { TaskForm, TaskSchema } from "components/CreateTasks";
import { Task } from "constants/task";
import { useState } from "react";

export type EditTaskFormProps = {
  onSubmit?: (task: TaskForm) => void;
  mode?: "create" | "edit";
  submitting?: boolean;
  submitText?: string;
  submittingText?: string;
  initialData?: Partial<TaskForm>;
  setIsShowModal: (value: boolean) => void;
  setIsShowParModal: (value: boolean) => void;
  boards: Board[];
  board: Board;
  columnId: number;
  currentTask: Task;
};

const EditTask = ({
  onSubmit,
  currentTask,
  initialData = {
    title: currentTask?.title,
    desc: currentTask?.desc,
    subtasks: currentTask?.subtasks,
    status: currentTask?.status,
  },
  setIsShowModal,
  setIsShowParModal,
  boards,
  board,
  columnId,
}: EditTaskFormProps) => {
  const dispatch = useDispatch();

  const [subtaskId, setSubtaskId] = useState(
    currentTask.subtasks.length > 0
      ? currentTask.subtasks[currentTask.subtasks.length - 1].id + 1
      : 0
  );

  console.log({ currentTask });

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

  const createTaskId = (id: number) => {
    console.log("create ID", id);
    if (id >= 0) {
      return id + 1;
    } else {
      return 0;
    }
  };

  const changeStatus = (task: Task) => {
    // find column to move
    const targetColumn = board.columns.filter(
      (col) => col.name === task.status
    )[0];

    // task will be moved
    const copiedTask: Task = {
      ...task,
      id:
        targetColumn.tasks.length > 0
          ? createTaskId(targetColumn?.tasks[targetColumn.tasks.length - 1].id)
          : 0,
    };

    console.log({ copiedTask });

    dispatch(
      updateABoard(
        boards.map((b) =>
          b.id === board.id
            ? {
                ...b,
                columns: b.columns.map((col) => {
                  // remove current task in current column
                  if (col.id === columnId) {
                    return {
                      ...col,
                      tasks: col.tasks.filter((t) => t.id !== currentTask.id),
                    };
                  }
                  // add new task to new column
                  else if (col.name === task.status) {
                    return { ...col, tasks: [...col.tasks, copiedTask] };
                  } else {
                    return col;
                  }
                }),
              }
            : b
        )
      )
    );
  };

  onSubmit = (task: TaskForm) => {
    // the task will be appended to corresponding to its column
    const output = {
      id: currentTask?.id,
      ...task,
    };

    console.log({ output });

    if (task.status !== currentTask.status) {
      changeStatus(output);
      setIsShowParModal(false);
    } else {
      dispatch(updateATask({ boardId: board.id, columnId, task: output }));
    }
    setIsShowModal(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="dark:text-white">Edit Task</h2>
      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="title">
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
        <Label className="text-sm font-bold dark:text-white" htmlFor="desc">
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
        <Label className="text-sm font-bold dark:text-white" htmlFor="subtasks">
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
              onClick={() => {
                remove(index);
                console.log("field length ", fields.length);
                if (fields.length === 1) setSubtaskId(0);
              }}
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
          onClick={() => {
            append({
              id: subtaskId,
              title: "",
              isDone: false,
            });
            setSubtaskId((pre) => pre + 1);
            console.log("add subtask id ", subtaskId);
          }}
        >
          +Add New Subtask
        </Button>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="status">
          Status
        </Label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              // defaultValue={boards?.columns[0].name}
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
                {board.columns.map((column) => (
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
        Save Changes
      </Button>
    </form>
  );
};

export default EditTask;
