import DeleteModal from "components/DeleteModal";
import Dropdown from "components/Dropdown";
import Modal from "components/Modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui";
import { Checkbox } from "components/ui/checkbox";
import { Board } from "constants/board";
import { EditAndDelTask } from "constants/dropdown";
import { Subtask, Task } from "constants/task";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateABoard } from "redux/boardSlice";

type ViewTaskProps = {
  task: Task;
  columnId: number;
  boardId: number;
  setIsShowModal: (value: boolean) => void;
};

const ViewTask = ({
  task,
  boardId,
  columnId,
  setIsShowModal,
}: ViewTaskProps) => {
  const dispatch = useDispatch();

  const [isShowEditTask, setIsShowEditTask] = useState(false);
  const [isShowDelTask, setIsShowDelTask] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const boards: Board[] = useSelector((state: any) => state.boardStore.boards);

  console.log("View Task: ", task);

  const countSubtaskDone = (subtasks: Subtask[]) => {
    // find subtasks have an attribute called "isDone" is true
    const count = subtasks.filter((sub) => sub.isDone === true);
    return count.length;
  };

  const handleCheck = (id: number) => {
    // find subtask
    const currentSubtask: Subtask = task?.subtasks?.filter(
      (subtask) => subtask.id === id
    )[0];

    // copy subtask to modify
    let copiedSubtask = { ...currentSubtask };
    console.log({ currentSubtask });
    copiedSubtask.isDone = !copiedSubtask.isDone;

    // dispatch
    dispatch(
      updateABoard(
        boards.map((board) =>
          board.id === boardId
            ? {
                ...board,
                columns: board.columns.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        tasks: column.tasks.map((t) =>
                          t.id === task.id
                            ? {
                                ...t,
                                subtasks: t.subtasks.map((subtask) =>
                                  subtask.id === id
                                    ? (subtask = copiedSubtask)
                                    : subtask
                                ),
                              }
                            : t
                        ),
                      }
                    : column
                ),
              }
            : board
        )
      )
    );
  };

  const createTaskId = (id: number) => {
    console.log("create ID", id);
    if (id >= 0) {
      return id + 1;
    } else {
      return 0;
    }
  };

  const changeStatus = (status: string) => {
    // find column to move
    const targetColumn = boards[boardId].columns.filter(
      (col) => col.name === status
    )[0];

    // task will be moved
    const copiedTask: Task = {
      ...task,
      id:
        targetColumn.tasks.length > 0
          ? createTaskId(targetColumn?.tasks[targetColumn.tasks.length - 1].id)
          : 0,
      status,
    };
    console.log({ copiedTask });

    dispatch(
      updateABoard(
        boards.map((board) =>
          board.id === boardId
            ? {
                ...board,
                columns: board.columns.map((col) => {
                  if (col.id === columnId) {
                    return {
                      ...col,
                      tasks: col.tasks.filter((t) => t.id !== task.id),
                    };
                  } else if (col.name === status) {
                    return { ...col, tasks: [...col.tasks, copiedTask] };
                  } else {
                    return col;
                  }
                }),
              }
            : board
        )
      )
    );

    setIsShowModal(false);
  };

  return (
    <>
    <div className='space-y-6'>
      <div className="flex justify-between relative">
        <h2>{task?.title}</h2>
        <img
        onClick={() => setIsShowDropdown(true)}
          className="w-[4.6px] h-[20px]"
          src="./imgs/icon-vertical-ellipsis.svg"
          alt=""
        />
        {isShowDropdown && (
          <Dropdown data={EditAndDelTask} setIsShowDropdown={setIsShowDropdown} setIsShowModal={[setIsShowEditTask, setIsShowDelTask]} />
        )}
      </div>
      <p className="text-grey">{task?.desc}</p>
      <div className="space-y-4">
        <h4 className="text-grey">
          Subtasks ({countSubtaskDone(task.subtasks)} of {task.subtasks.length})
        </h4>
        <div className="space-y-2">
          {task?.subtasks?.map((sub) => (
            <div
              className="flex items-center gap-x-4 p-3 rounded-[4px] bg-light-grey"
              key={sub.id}
            >
              <Checkbox
                checked={sub.isDone}
                onCheckedChange={() => handleCheck(sub.id)}
              />
              <h4
                className={`${
                  sub.isDone ? "line-through opacity-50" : "text-black"
                }`}
              >
                {sub.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-grey">Current Status</h4>
        <Select
          // defaultValue={boards && boards?.columns[0].name}
          value={task.status}
          onValueChange={(value) => changeStatus(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select the status of the task" />
          </SelectTrigger>
          <SelectContent>
            {boards[boardId].columns.map((column) => (
              <SelectItem key={column.id} value={column.name}>
                {column.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    {isShowEditTask && (
        // <Modal
        //   setIsShowModal={setIsShowEditTask}
        //   childComp={
        //     <EditBoard
        //       currentBoard={board}
        //       setIsShowModal={setIsShowEditBoard}
        //     />
        //   }
        // />
        null
      )}
      {isShowDelTask && (
        <Modal
          setIsShowModal={setIsShowDelTask}
          childComp={
            <DeleteModal
              boardId={boardId}
              columnId={columnId}
              taskId={task.id}
              setIsShowModal={setIsShowDelTask}
            />
          }
        />
      )}
    </>
  );
};

export default ViewTask;
