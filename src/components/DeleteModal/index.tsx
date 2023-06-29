import { Button } from "components/ui";
import { Board } from "constants/board";
import { Task } from "constants/task";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBoard, deleteTask } from "redux/boardSlice";

type DeleteModalProps = {
  currentBoard: Board;
  columnId?: number;
  currentTask?: Task;
  boards?: Board[];
  setIsShowModal: (value: boolean) => void;
  setIsShowParModal: (value: boolean) => void;
};

const DeleteModal = ({
  currentBoard,
  columnId,
  currentTask,
  boards,
  setIsShowModal,
  setIsShowParModal,
}: DeleteModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    // delete board
    if (!columnId && !currentTask) {
      dispatch(deleteBoard(currentBoard));
      console.log("delete board: ", boards);
      if (boards && boards?.length > 1 && boards[0].id !== currentBoard.id) {
        console.log("navigate to first board");
        navigate(`${boards[0].id}`);
      } else if (
        boards &&
        boards?.length > 1 &&
        boards[0].id === currentBoard.id
      ) {
        console.log("navigate to second board");
        navigate(`${boards[1].id}`);
      } else {
        console.log("navigate to home");
        navigate("/");
      }
    }
    // delete task
    else {
      console.log("delete task");
      dispatch(deleteTask(currentTask!));
      setIsShowParModal && setIsShowParModal(false);
    }

    setIsShowModal(false);
  };

  useEffect(() => {
    setIsShowParModal(false);

    return () => {
      setIsShowParModal(true);
    };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="dark:text-red">
        Delete this {currentTask ? "task" : "board"}
      </h2>
      {!currentTask ? (
        <p className="text-grey">
          Are you sure you want to delete the {currentBoard?.name} board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
      ) : (
        <p className="text-grey">
          Are you sure you want to delete the {currentTask?.title} task and its
          subtasks? This action cannot be reversed.
        </p>
      )}
      <div className="flex justify-between gap-x-4">
        <Button
          onClick={handleDelete}
          className="w-full"
          variant={"destructive"}
        >
          Delete
        </Button>
        <Button
          onClick={() => setIsShowModal(false)}
          className="w-full"
          variant={"secondary"}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
