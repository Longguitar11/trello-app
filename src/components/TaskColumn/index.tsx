import Card from "components/Card";
import CreateColumn from "components/CreateColumn";
import Modal from "components/Modal";
import ViewTask from "components/ViewTask";
import { Board } from "constants/board";
import { Task } from "constants/task";
import EmptyBoard from "pages/EmptyBoard";
import { useHidden } from "pages/Layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TaskColumn = () => {
  const [isCreateColumnModal, setIsCreateColumnModal] = useState(false);
  const [isViewTaskModal, setIsViewTaskModal] = useState(false);

  const [ids, setIds] = useState({ columnId: 0, taskId: 0 });
  // const [columnId, setColumnId] = useState(0);

  // get a prop from context of Outlet
  const { isHidden } = useHidden();

  let { boardId } = useParams();
  const id = parseInt(boardId!);

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  );

  // copy board
  let boardCopied = [...boardList];

  // find current board
  const board = boardCopied.find((board) => board.id === id);

  let selectedTask: Task = {
    desc: "",
    id: 0,
    status: "",
    subtasks: [],
    title: "",
  };

  return (
    <>
      {board && board?.columns.length > 0 ? (
        <>
          <div className="pt-6 bg-light-grey flex gap-x-6 px-6 w-full">
            {board?.columns?.map((column) => (
              <section key={column.id} className="w-[280px]">
                <div className="flex items-center gap-x-3 mb-6">
                  <div className="bg-[#49C4E5] w-[15px] h-[15px] rounded-full"></div>
                  <h4 className="text-grey">{column.name}</h4>
                </div>
                <div className="space-y-[20px]">
                  {column.tasks?.map((task) => {
                    if (ids.taskId === task.id && ids.columnId === column.id)
                      selectedTask = task;
                    return (
                      <Card
                        onClick={() => {
                          setIsViewTaskModal(true);
                          setIds({ columnId: column.id, taskId: task.id });
                        }}
                        key={task.id}
                        title={task.title}
                        task={task}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
            <div
              onClick={() => setIsCreateColumnModal(true)}
              className="flex w-[280px] mb-[50px] bg-[#e9effa] bg-opacity-50 cursor-pointer rounded-[6px] text-grey hover:text-purple transition-colors duration-200"
            >
              <h1 className="m-auto">+ New Column</h1>
            </div>
          </div>

          {/* Show Create Column Modal */}
          {isCreateColumnModal && (
            <Modal
              setIsShowModal={setIsCreateColumnModal}
              childComp={
                <CreateColumn board={board} setIsShowModal={setIsCreateColumnModal} />
              }
              customStyle={`-mt-[100px] ${!isHidden && "-ml-[300px]"}`}
            />
          )}

          {/* Show View Task Modal */}
          {isViewTaskModal && (
            <Modal
              setIsShowModal={setIsViewTaskModal}
              childComp={
                <ViewTask
                  setIsShowModal={setIsViewTaskModal}
                  task={selectedTask}
                  columnId={ids.columnId}
                  boardId={board.id}
                />
              }
              customStyle={`-mt-[100px] ${!isHidden && "-ml-[300px]"}`}
            />
          )}
        </>
      ) : board?.columns.length === 0 ? (
        <EmptyBoard />
      ) : null}
    </>
  );
};

export default TaskColumn;
