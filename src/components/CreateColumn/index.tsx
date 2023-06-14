import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Label } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { createAColumn } from "redux/boardSlice";
import { Board } from "constants/board";
import { useParams } from "react-router-dom";

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
};

const CreateColumn = ({
  onSubmit,
  initialData = {},
  setIsShowModal,
}: ColumnFormProps) => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
const id = parseInt(boardId!)

  const boardList: Board[] = useSelector((state: any) => state.boardStore.boards);
  console.log({ boardList });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ColumnForm>({
    resolver: zodResolver(ColumnSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  onSubmit = (column: ColumnForm) => {
    const result = { ...column, id: boardList[`${id}`].columns.length | 0, tasks: [] };

    // add task to redux
    dispatch(
      createAColumn(
        boardList.map((board: Board) =>
          board.id === id
            ? {
                ...board,
                columns: [...board.columns, result],
              }
            : board
        )
      )
    );

    setIsShowModal(false);
  };

  console.log({ errors });

  return (
    <form
      className="flex flex-col gap-y-6 rounded-[6px] bg-white p-8 w-[480px]"
      onSubmit={handleSubmit(onSubmit)}
    >
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
