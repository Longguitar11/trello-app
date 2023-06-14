import { useNavigate } from "react-router-dom";
import { Switch } from "../ui/switch";
import { useState } from "react";
import Modal from "components/Modal";
import CreateBoard from "components/CreateBoard";
import { Board } from "constants/board";

type SideBarProps = {
  setIsHidden: (isHidden: boolean) => void;
  isHidden: boolean;
  sidebar: Board[];
  boards: Board[];
};

const SideBar = ({ setIsHidden, isHidden, sidebar, boards }: SideBarProps) => {
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState(sidebar ? sidebar[0]?.id : null);
  const [isShowModal, setIsShowModal] = useState(false);

  const hideSideBar = () => {
    setIsHidden(true);
  };

  const showSideBar = () => {
    setIsHidden(false);
  };

  return (
    <>
      {!isHidden ? (
        <div
          className={`fixed left-0 top-0 bg-white w-[300px] h-screen border-light border-r-2 flex flex-col`}
        >
          <section className="flex items-center gap-x-4 p-8 mb-6">
            <div className="flex items-center gap-x-[3px]">
              <div className="w-[6px] h-6 rounded-[2px] bg-purple"></div>
              <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-75"></div>
              <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-50"></div>
            </div>
            <h1>kanban</h1>
          </section>
          <div className="flex flex-col justify-between flex-1">
            <section className="mr-6">
              <h4 className="ml-8 mb-4 text-grey">
                ALL BOARDS ({boards ? boards.length : 0})
              </h4>
              <div>
                {sidebar?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setIsSelected(index);
                      navigate(`${item.id}`);
                    }}
                    className={`${
                      isSelected === item.id
                        ? "bg-purple text-white"
                        : "text-grey"
                    } gap-x-4 py-4 pl-8 flex items-center rounded-r-full hover:bg-purple hover:bg-opacity-10 hover:text-purple transition-all duration-200 cursor-pointer`}
                  >
                    <img
                      className="w-4 h-4 "
                      src="./imgs/icon-board.svg"
                      alt="board"
                    />
                    <h3>{item.name}</h3>
                  </div>
                ))}
                <div className="gap-x-4 py-4 pl-8 flex items-center rounded-r-full hover:bg-purple text-purple hover:bg-opacity-10 transition-all duration-200 cursor-pointer">
                  <img
                    className="w-4 h-4 "
                    src="./imgs/icon-board.svg"
                    alt="board"
                  />
                  <h3
                    onClick={() => setIsShowModal(true)}
                    className="text-purple"
                  >
                    +Create New Board
                  </h3>
                </div>
              </div>
            </section>
            <section className="mb-8">
              <div className="flex justify-center items-center gap-x-6 bg-light-grey rounded-[6px] py-[14px] w-[calc(100%-48px)] mx-6 mb-2">
                <img
                  className="w-4 h-4"
                  src="./imgs/icon-light-theme.svg"
                  alt="light"
                />
                <Switch />
                <img
                  className="w-4 h-4"
                  src="./imgs/icon-dark-theme.svg"
                  alt="dark"
                />
              </div>
              <div
                onClick={hideSideBar}
                className="flex gap-x-4 rounded-r-full cursor-pointer hover:bg-purple hover:bg-opacity-10 hover:text-purple transition-all duration-200 text-grey py-4 mr-6"
              >
                <img
                  className="ml-8"
                  src="./imgs/icon-hide-sidebar.svg"
                  alt="hide sidebar"
                />
                <h3>Hide Sidebar</h3>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div
          onClick={showSideBar}
          className="fixed left-0 bottom-8 bg-purple p-[20px] rounded-r-full cursor-pointer hover:bg-purple-hover transition-opacity duration-200"
        >
          <img
            className=""
            src="./imgs/icon-show-sidebar.svg"
            alt="show sidebar"
          />
        </div>
      )}

      {/* Show Modal */}
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          childComp={<CreateBoard setIsShowModal={setIsShowModal} />}
          customStyle="z-10"
        />
      )}
    </>
  );
};

export default SideBar;
