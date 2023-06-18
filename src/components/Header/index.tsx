import CreateTask from "components/CreateTasks";
import DeleteModal from "components/DeleteModal";
import Dropdown from "components/Dropdown";
import EditBoard from "components/EditBoard";
import Modal from "components/Modal";
import { Button } from "components/ui";
import { Board } from "constants/board";
import { EditAndDelBoard } from "constants/dropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

type HeaderProps = {
  isHidden: boolean;
  boards: Board[]
};

const Header = ({ isHidden, boards }: HeaderProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowEditBoard, setIsShowEditBoard] = useState(false);
  const [isShowDelBoard, setIsShowDelBoard] = useState(false);

  const [isShowDropdown, setIsShowDropdown] = useState(false);

  // copy board
  let boardCopied = [...boards];
  let { boardId } = useParams();
  let id = parseInt(boardId!)

  const board = boardCopied.filter((board) => board.id === id)[0];
  console.log("Header: ", board);

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
          <div className="flex gap-x-6 items-center relative">
            <Button
              onClick={() => setIsShowModal(true)}
              size="l"
              className="px-6"
              disabled={board ? !(board?.columns.length > 0) : true}
            >
              +Add New Task
            </Button>
            <img
              onClick={() => setIsShowDropdown(true)}
              className="w-[4.6px] h-[20px] cursor-pointer "
              src="./imgs/icon-vertical-ellipsis.svg"
              alt="icon"
            />

            {isShowDropdown && (
              <Dropdown
                data={EditAndDelBoard}
                // set function must be transmit rightly follow to data of dropdown
                setIsShowModal={[setIsShowEditBoard, setIsShowDelBoard]}
                setIsShowDropdown={setIsShowDropdown}
              />
            )}
          </div>
        </div>
      </div>
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          childComp={<CreateTask board={board} setIsShowModal={setIsShowModal} />}
        />
      )}
      {isShowEditBoard && (
        <Modal
          setIsShowModal={setIsShowEditBoard}
          childComp={
            <EditBoard
              currentBoard={board}
              setIsShowModal={setIsShowEditBoard}
            />
          }
        />
      )}
      {isShowDelBoard && (
        <Modal
          setIsShowModal={setIsShowDelBoard}
          childComp={
            <DeleteModal
              boardId={board?.id}
              setIsShowModal={setIsShowDelBoard}
            />
          }
        />
      )}
    </>
  );
};

export default Header;
