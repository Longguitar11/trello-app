import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Label } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { updateABoard } from "redux/boardSlice";
import { Board } from "constants/board";

const ColumnSchema = z.object({
  name: z.string().min(1, { message: "Title of subtask cannot be empty" }),
});

export type ColumnForm = z.infer<typeof ColumnSchema>;

export type ColumnFormProps = {
  onSubmit?: (task: ColumnForm) => void;
  mode?: "create" | "edit";
  submitting?: boolean;
  submitText?: string;
  submittingText?: string;
  initialData?: Partial<ColumnForm>;
  setIsShowModal: (value: boolean) => void;
  board: Board
};

const CreateColumn = ({
  onSubmit,
  initialData = {},
  setIsShowModal,
  board
}: ColumnFormProps) => {
  const dispatch = useDispatch();

  const boardList: Board[] = useSelector((state: any) => state.boardStore?.boards)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ColumnForm>({
    resolver: zodResolver(ColumnSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  onSubmit = (column: ColumnForm) => {
    const result = {
      id: board.columns[board.columns.length - 1].id + 1 | 0,
      ...column,
      tasks: [],
    };

    // add task to redux
    dispatch(
      updateABoard(
        boardList.map((b: Board) =>
          b.id === board.id
            ? {
                ...b,
                columns: [...b.columns, result],
              }
            : board
        )
      )
    );

    setIsShowModal(false);
  };

  console.log({ errors });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="">Add New Column</h2>
      <div className="space-y-2">
        <Label className="text-sm font-bold" htmlFor="name">
          Column
        </Label>
        <Input
          id="name"
          {...register("name", { required: true })}
          placeholder="e.g. Todo"
        />
        {errors.name && (
          <p className="text-red" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit">
        Create Column
      </Button>
    </form>
  );
};

export default CreateColumn;
