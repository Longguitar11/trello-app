import CreateTask from "components/CreateTasks";
import Modal from "components/Modal";
import { Button } from "components/ui";
import { Board } from "constants/board";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

type HeaderProps = {
  isHidden: boolean;
};

const Header = ({ isHidden }: HeaderProps) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  );

  // copy board
  let boardCopied = [...boardList];
  let { boardId } = useParams();

  const board = boardCopied.find((board) => board.id === parseInt(boardId!));

  return (
    <>
      <div className="flex">
        {isHidden && (
          <section className="fixed top-0 left-0 flex items-center gap-x-4 p-8 w-[210px] h-[100px] border-light border-b-2 border-r-2">
            <div className="flex items-center gap-x-[3px]">
              <div className="w-[6px] h-6 rounded-[2px] bg-purple"></div>
              <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-75"></div>
              <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-50"></div>
            </div>
            <h1>kanban</h1>
          </section>
        )}
        <div
          className={`${
            isHidden ? "w-[calc(100%-210px)]" : "w-[calc(100%-300px)]"
          } bg-white h-[100px] fixed right-0 top-0 flex justify-between items-center px-6 border-light border-b-2`}
        >
          <h1>Platform Launch</h1>
          <div className="flex gap-x-6 items-center">
            <Button
              onClick={() => setIsShowModal(true)}
              size="l"
              className="px-6"
              disabled={board ? !(board?.columns.length > 0) : true}
            >
              +Add New Task
            </Button>
            <img
              className="w-[4.6px] h-[20px] cursor-pointer"
              src="./imgs/icon-vertical-ellipsis.svg"
              alt="icon"
            />
          </div>
        </div>
      </div>
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          childComp={<CreateTask setIsShowModal={setIsShowModal} />}
        />
      )}
    </>
  );
};

export default Header;
