import CreateBoard from "components/CreateBoard";
import CreateTask from "components/CreateTasks";
import DeleteModal from "components/DeleteModal";
import Dropdown from "components/Dropdown";
import EditBoard from "components/EditBoard";
import Modal from "components/Modal";
import SideBarModal from "components/Modal/SideBarModal";
import MobileSideBar from "components/SideBar/MobileSideBar";
import { Button } from "components/ui";
import { Board } from "constants/board";
import { EditAndDelBoard } from "constants/dropdown";
import { useBoard } from "hooks/useBoard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type HeaderProps = {
  isHidden: boolean;
  boards: Board[];
  sideBarData: {
    setIsHidden: (value: boolean) => void;
    isHidden: boolean;
    isDark: boolean;
    setIsDark: (value: boolean) => void;
  };
};

const Header = ({ isHidden, boards, sideBarData }: HeaderProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowEditBoard, setIsShowEditBoard] = useState(false);
  const [isShowDelBoard, setIsShowDelBoard] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isChevron, setIsChevron] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isShowCreateBoard, setIsShowCreateBoard] = useState(false);

  const { boardId } = useParams();

  const currentBoard = useBoard(boardId ? parseInt(boardId) : undefined);

  const clickDropdown = () => {
    if (currentBoard) setIsShowDropdown(!isShowDropdown);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          isHidden
            ? "w-full"
            : "ta:w-[calc(100%-300px)] mo:w-[calc(100%-260px)] w-full"
        } dark:bg-dark-grey bg-white ta:h-[100px] mo:h-[80px] h-16 fixed right-0 top-0 z-[1] flex dark:border-dark border-light border-b-2`}
      >
        {isHidden && (
          <section className="flex justify-center items-center gap-x-4 ta:w-[210px] w-[200px] dark:border-dark border-light border-r-2">
            <div className="flex items-center gap-x-[3px]">
              <div className="w-[6px] h-6 rounded-[2px] bg-purple"></div>
              <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-75"></div>
              <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-50"></div>
            </div>
            <h1 className="dark:text-white font-black">kanban</h1>
          </section>
        )}
        <div
          className={`flex-1 flex justify-between items-center ${
            isHidden ? "ta:px-8 mo:px-6" : "mo:px-6 px-4"
          }`}
        >
          <div className="flex items-center gap-x-4">
            {screenWidth <= 375 && (
              <div className="flex items-center gap-x-[3px]">
                <div className="w-[6px] h-6 rounded-[2px] bg-purple"></div>
                <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-75"></div>
                <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-50"></div>
              </div>
            )}
            <h1 className="dark:text-white ta:text-xl mo:text-[20px] text-l whitespace-nowrap">
              Platform Launch
            </h1>
            {screenWidth <= 375 && (
              <div
                onClick={() => setIsChevron(true)}
                className="flex items-center gap-x-[3px] p-2 rounded-sm dark:hover:bg-dark hover:bg-light-grey"
              >
                <img src="./imgs/icon-chevron-down.svg" alt="" />
              </div>
            )}
          </div>
          <div className="flex gap-x-4 mo:gap-x-6 items-center relative">
            <Button
              onClick={() => setIsShowModal(true)}
              size={screenWidth <= 375 ? "default" : "l"}
              className="px-[18px] mo:px-6 whitespace-nowrap"
              disabled={
                currentBoard ? !(currentBoard?.columns.length > 0) : true
              }
            >
              {screenWidth <= 375 ? (
                <img src="./imgs/icon-add-task-mobile.svg" alt="add task" />
              ) : (
                "+Add New Task"
              )}
            </Button>
            <div
              className="p-2 rounded-[4px] cursor-pointer dark:hover:bg-dark hover:bg-light-grey transition-colors duration-200"
              onClick={clickDropdown}
            >
              <img
                className="w-[4.6px] h-[20px]"
                src="./imgs/icon-vertical-ellipsis.svg"
                alt="icon"
              />
            </div>

            {isShowDropdown && (
              <Dropdown
                customStyle="top-16 z-10"
                data={EditAndDelBoard}
                // set function must be transmit rightly follow to data of dropdown
                setIsShowModal={[setIsShowEditBoard, setIsShowDelBoard]}
                setIsShowDropdown={setIsShowDropdown}
              />
            )}
          </div>
        </div>
      </div>
      {isShowModal && currentBoard && (
        <Modal
          setIsShowModal={setIsShowModal}
          childComp={
            <CreateTask board={currentBoard} setIsShowModal={setIsShowModal} />
          }
        />
      )}
      {isShowEditBoard && currentBoard && (
        <Modal
          setIsShowModal={setIsShowEditBoard}
          childComp={
            <EditBoard
              currentBoard={currentBoard}
              setIsShowModal={setIsShowEditBoard}
            />
          }
        />
      )}
      {isShowDelBoard && currentBoard && (
        <Modal
          setIsShowModal={setIsShowDelBoard}
          childComp={
            <DeleteModal
              boards={boards}
              currentBoard={currentBoard}
              setIsShowModal={setIsShowDelBoard}
            />
          }
        />
      )}
      {isChevron && (
        <SideBarModal
          setIsShowModal={setIsChevron}
          childComp={
            <MobileSideBar
              boards={boards}
              isDark={sideBarData.isDark}
              setIsDark={sideBarData.setIsDark}
              setIsShowModal={setIsShowCreateBoard}
              setIsChevron={setIsChevron}
            />
          }
        />
      )}
      {/* Show Modal */}
      {isShowCreateBoard && (
        <Modal
          setIsShowModal={setIsShowCreateBoard}
          childComp={<CreateBoard setIsShowModal={setIsShowModal} />}
          customStyle="z-10"
        />
      )}
    </>
  );
};

export default Header;
