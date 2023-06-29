import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Label } from "../ui";
import { useDispatch } from "react-redux";
import { Board } from "constants/board";
import { addColumn } from "redux/boardSlice";
import { Columns } from "constants/columns";

const ColumnSchema = z.object({
  name: z.string().min(1, { message: "Title of subtask cannot be empty" }),
});

export type ColumnForm = z.infer<typeof ColumnSchema>;

export type ColumnFormProps = {
  mode?: "create" | "edit";
  submitting?: boolean;
  submitText?: string;
  submittingText?: string;
  initialData?: Partial<ColumnForm>;
  setIsShowModal: (value: boolean) => void;
  board: Board;
};

const CreateColumn = ({
  initialData = {},
  setIsShowModal,
  board,
}: ColumnFormProps) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ColumnForm>({
    resolver: zodResolver(ColumnSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  console.log("CreateColumn" , board)

  const onSubmit = (column: ColumnForm) => {
    const result = {
      id: new Date().getTime(),
      ...column,
      tasks: [],
    } as Columns;

    console.log("create column ", result);

    // add task to redux
    dispatch(
      addColumn({
        boardId: board.id,
        column: result,
      })
    );

    setIsShowModal(false);
  };

  console.log({ errors });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="dark:text-white">Add New Column</h2>
      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="name">
          Column
        </Label>
        <Input
          id="name"
          autoFocus
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
