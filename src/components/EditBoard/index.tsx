import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Label } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { updateABoard } from "redux/boardSliceBackup";
import { BoardForm, BoardSchema } from "components/CreateBoard";
import { Board } from "constants/board";
import { useState } from "react";

export type BoardFormProps = {
  onSubmit?: (task: BoardForm) => void;
  mode?: "create" | "edit";
  submitting?: boolean;
  submitText?: string;
  submittingText?: string;
  initialData?: Partial<BoardForm>;
  setIsShowModal: (value: boolean) => void;
  currentBoard: Board;
};

const EditBoard = ({
  onSubmit,
  currentBoard,
  initialData = { name: currentBoard?.name, columns: currentBoard?.columns },
  setIsShowModal,
}: BoardFormProps) => {
  const dispatch = useDispatch();

  console.log({ currentBoard });

  const [colId, setColId] = useState(
    currentBoard.columns.length > 0
      ? currentBoard.columns[currentBoard.columns.length - 1].id + 1
      : 0
  );

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  );

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

  onSubmit = (editedBoard: BoardForm) => {
    console.log("edit board ", editedBoard);
    const data = { ...editedBoard, id: currentBoard?.id };
    console.log({ data });
    dispatch(
      updateABoard(
        boardList.map((board) =>
          board.id === currentBoard?.id ? { ...data } : board
        )
      )
    );
    setIsShowModal(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="dark:text-white">Edit Board</h2>
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

      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="columns">
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
          onClick={() => {
            append({
              id: colId,
              name: "",
              tasks: [],
            });
            setColId((pre) => pre + 1);
            console.log("added id: ", colId);
          }}
        >
          +Add New Columns
        </Button>
      </div>

      <Button className="w-full" type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default EditBoard;
