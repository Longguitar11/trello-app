import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Label } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { Board } from "constants/board";
import { useNavigate } from "react-router-dom";
import { addBoard } from "redux/boardSlice";
import { Columns } from "constants/columns";

export const BoardSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Title is required" }),
  columns: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().superRefine((val, ctx) => {
          if (val.length < 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Column name can't be empty",
              fatal: true,
            });

            return z.NEVER;
          }

          if (val.length >= 10) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Column name should be less than 10 characters",
            });
          }
        }),
        // min(1, { message: "Column name is required" }),
        // .max(20, {
        //   message: "Name of column can't be greater than 20 characters",
        // }),
        tasks: z.array(z.any()),
      })
    )
    .optional(),
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
  initialData,
  setIsShowModal,
}: BoardFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  );
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

  // if boards doesn't have any elements, then id is 0
  // if boards have elements, id is id of the last element add to 1
  // > 0,

  onSubmit = (board: BoardForm) => {
    const id = new Date().getTime();

    const newBoard: Board = {
      id,
      name: board.name,
      columns: board.columns as Columns[],
    };

    dispatch(addBoard(newBoard));
    console.log("create board ", { ...board, id });
    setIsShowModal(false);
    // navigate to board is just created
    navigate(`${id}`);
  };

  console.log({ errors });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="dark:text-white">Add New Board</h2>

      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="name">
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

      <div>
        <Label
          className="text-sm font-bold mb-2 dark:text-white"
          htmlFor="columns"
        >
          Columns
        </Label>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex gap-x-4 items-center">
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
              {errors.columns && (
                <p className="text-red" role="alert">
                  Column name should be less than 10 characters
                </p>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          className="w-full mt-3"
          onClick={() =>
            append({ id: new Date().getTime(), name: "", tasks: [] })
          }
        >
          +Add New Column
        </Button>
      </div>

      <Button className="w-full" type="submit">
        Create Board
      </Button>
    </form>
  );
};

export default CreateBoard;
