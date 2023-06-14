import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Label } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { createABoard } from "redux/boardSlice";

const BoardSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  columns: z.array(
    z.object({
      id: z.number(),
      name: z.string().min(1, { message: "Title of subtask cannot be empty" }),
      tasks: z.array(
        z.object({
          title: z.string(),
          desc: z.string(),
          subtasks: z.array(
            z.object({
              id: z.number(),
              title: z.string(),
            })
          ),
          status: z.string(),
        })
      ),
    })
  ),
});

export type BoardForm = z.infer<typeof BoardSchema>;

export type BoardFormProps = {
  onSubmit?: (task: BoardForm) => void;
  mode?: "create" | "edit";
  submitting?: boolean;
  submitText?: string;
  submittingText?: string;
  initialData?: Partial<BoardForm>;
  setIsShowModal: (value: boolean) => void;
};

const CreateBoard = ({
  onSubmit,
  initialData = { columns: [{ id: 0, name: "", tasks: [] }] },
  setIsShowModal,
}: BoardFormProps) => {
  const dispatch = useDispatch();

  const boardList = useSelector((state: any) => state.boardStore.boards);
  console.log({ boardList });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<BoardForm>({
    resolver: zodResolver(BoardSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  // use useFieldArray for columns
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  onSubmit = (board: BoardForm) => {
    dispatch(createABoard({ ...board, id: boardList.length | 0 }));
    console.log(board);
    setIsShowModal(false);
  };

  console.log({ errors });

  return (
    <form
      className="flex flex-col gap-y-6 rounded-[6px] bg-white p-8 w-[480px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="">Add New Board</h2>
      <div className="space-y-2">
        <Label className="text-sm font-bold" htmlFor="name">
          Name
        </Label>
        <Input
          id="name"
          {...register("name", { required: true })}
          placeholder="e.g. Web Design"
        />
        {errors.name && (
          <p className="text-red" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-bold" htmlFor="columns">
          Columns
        </Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-x-4 items-center">
            <Input
              {...register(`columns.${index}.name`)}
              id="columns"
              type="text"
            />
            <img
              onClick={() => remove(index)}
              className="w-4 h-4 cursor-pointer"
              src="./imgs/icon-cross.svg"
              alt="cross"
            />
          </div>
        ))}
        {errors.columns && (
          <p className="text-red" role="alert">
            The title of columns cannot be empty
          </p>
        )}

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => append({ id: fields.length, name: "", tasks: [] })}
        >
          +Add New Columns
        </Button>
      </div>

      <Button className="w-full" type="submit">
        Create Board
      </Button>
    </form>
  );
};

export default CreateBoard;
