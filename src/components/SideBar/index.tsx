import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import Modal from "components/Modal";
import CreateBoard from "components/CreateBoard";
import { Board } from "constants/board";

type SideBarProps = {
  setIsHidden: (isHidden: boolean) => void;
  isHidden: boolean;
  boards: Board[];
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

const SideBar = ({
  setIsHidden,
  isHidden,
  boards,
  isDark,
  setIsDark,
}: SideBarProps) => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const id = parseInt(boardId!);

  const [isSelected, setIsSelected] = useState(
    id ? id : boards.length > 0 ? boards[0].id : null
  );

  const [isShowModal, setIsShowModal] = useState(false);

  const hideSideBar = () => {
    setIsHidden(true);
  };

  const showSideBar = () => {
    setIsHidden(false);
  };

  const checkSwitch = (check: boolean) => {
    // Whenever the user explicitly chooses light mode
    if (check) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      console.log("remove dark");
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    // localStorage.removeItem('theme')
  };

  // check if board id exist then sidebar id is assigned
  useEffect(() => {
    if (typeof id === "number") {
      setIsSelected(id);
    }
  }, [id]);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      console.log("add dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      {!isHidden ? (
        <div
          className={`fixed left-0 top-0 bg-white dark:bg-dark-grey ta:w-[300px] w-[260px] mo:flex hidden h-screen dark:border-dark border-light border-r-2 flex-col`}
        >
          <section className="hidden mo:flex items-center gap-x-4 p-8 mb-6 ">
            <div className="flex items-center gap-x-[3px]">
              <div className="w-[6px] h-6 rounded-[2px] bg-purple"></div>
              <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-75"></div>
              <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-50"></div>
            </div>
            <h1 className="dark:text-white">kanban</h1>
          </section>
          <div className="flex flex-col justify-between flex-1">
            <section className="mr-6">
              <h4 className="ml-8 mb-4 text-grey tracking-[2.4px]">
                ALL BOARDS ({boards ? boards.length : 0})
              </h4>
              <div>
                {boards?.map((item, index) => (
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
                    } gap-x-4 py-4 pl-8 flex items-center rounded-r-full dark:hover:bg-white hover:bg-purple hover:bg-opacity-10 hover:text-purple transition-all duration-200 cursor-pointer`}
                  >
                    <img
                      className="w-4 h-4 "
                      src="./imgs/icon-board.svg"
                      alt="board"
                    />
                    <h3>{item.name}</h3>
                  </div>
                ))}
                <div
                  onClick={() => setIsShowModal(true)}
                  className="gap-x-4 py-4 pl-8 flex items-center rounded-r-full dark:hover:bg-white hover:bg-purple text-purple hover:bg-opacity-10 transition-all duration-200 cursor-pointer"
                >
                  <img
                    className="w-4 h-4 "
                    src="./imgs/icon-board.svg"
                    alt="board"
                  />
                  <h3 className="text-purple">+Create New Board</h3>
                </div>
              </div>
            </section>
            <section className="mb-8">
              <div className="flex justify-center items-center gap-x-6 dark:bg-very-dark-grey bg-light-grey rounded-[6px] py-[14px] w-[calc(100%-48px)] mx-6 mb-2">
                <img
                  className="w-4 h-4"
                  src="./imgs/icon-light-theme.svg"
                  alt="light"
                />
                <Switch
                  checked={isDark}
                  onCheckedChange={(check) => checkSwitch(check)}
                />
                <img
                  className="w-4 h-4"
                  src="./imgs/icon-dark-theme.svg"
                  alt="dark"
                />
              </div>
              <div
                onClick={hideSideBar}
                className="flex gap-x-4 rounded-r-full cursor-pointer dark:hover:bg-white hover:bg-purple hover:bg-opacity-10 hover:text-purple transition-all duration-200 text-grey py-4 mr-6"
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
