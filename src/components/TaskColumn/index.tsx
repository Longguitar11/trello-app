import Card from "components/Card";
import CreateColumn from "components/CreateColumn";
import Modal from "components/Modal";
import { Board } from "constants/board";
import { Task } from "constants/task";
import EmptyBoard from "pages/EmptyBoard";
import { useHidden } from "pages/Layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";

const TaskColumn = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const {isHidden} = useHidden()

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  );

  // copy board
  let boardCopied = [...boardList];

  let { boardId } = useParams();

  const board = boardCopied.find((board) => board.id === parseInt(boardId!));

  return (
    <>
      {board && board?.columns.length > 0 ? (
        <>
          <div className="pt-6 bg-light-grey flex gap-x-6 px-6 w-full">
            {board?.columns?.map((column) => (
              <section key={column.id} className="w-[280px]">
                <div className="flex items-center gap-x-3 mb-6">
                  <div className="bg-[#49C4E5] w-[15px] h-[15px] rounded-full"></div>
                  <h4 className="text-grey ">{column.name}</h4>
                </div>
                <div className="space-y-[20px]">
                  {column.tasks?.map((task: Task) => (
                    <Card
                      key={task.id}
                      title={task.title}
                      subtaskLength={task.subtasks.length}
                    />
                  ))}
                </div>
              </section>
            ))}
            <div
              onClick={() => setIsShowModal(true)}
              className="flex w-[280px] mb-[50px] bg-[#e9effa] bg-opacity-50 cursor-pointer rounded-[6px] text-grey hover:text-purple transition-colors duration-200"
            >
              <h1 className="m-auto">+ New Column</h1>
            </div>
          </div>
          {isShowModal && (
            <Modal
              setIsShowModal={setIsShowModal}
              childComp={<CreateColumn setIsShowModal={setIsShowModal}/>}
              customStyle={`-mt-[100px] ${!isHidden && '-ml-[300px]'}`}
            />
          )}
        </>
      ) : (
        <EmptyBoard />
      )}
    </>
  );
};

export default TaskColumn;
