import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { Board } from "constants/board";

type MobileSideBarProps = {
  boards: Board[];
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  setIsShowModal: (value: boolean) => void;
  setIsChevron: (value: boolean) => void
};

const MobileSideBar = ({
  boards,
  isDark,
  setIsDark,
  setIsShowModal,
  setIsChevron
}: MobileSideBarProps) => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const id = parseInt(boardId!);

  const [isSelected, setIsSelected] = useState(
    id ? id : boards.length > 0 ? boards[0].id : null
  );

  console.log("side bar id state: ", isSelected);

  const checkSwitch = (check: boolean) => {
    // Whenever the user explicitly chooses light mode
    if (check) {
      console.log("assign dark");
      localStorage.theme = "dark";
    } else {
      console.log("assign light");
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
      console.log("remove dark");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col justify-between flex-1">
          <section className="mr-6">
            <h4 className="ml-6 mb-[19px] mt-4 text-grey tracking-[2.4px]">
              ALL BOARDS ({boards ? boards.length : 0})
            </h4>
            <div>
              {boards?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setIsSelected(index);
                    navigate(`${item.id}`);
                    setIsChevron(false)
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
                onClick={() => {setIsShowModal(true); setIsChevron(false)}}
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
          <section className="mt-4">
            <div className="flex justify-center items-center gap-x-6 dark:bg-very-dark-grey bg-light-grey rounded-[6px] py-[14px] mx-4 mb-4">
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
          </section>
        </div>
      </div>
    </>
  );
};

export default MobileSideBar;
