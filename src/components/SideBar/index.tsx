import { useNavigate } from "react-router-dom";
import { Switch } from "../ui/switch";
import { sidebar } from "../../constants/sidebar";
import { useState } from "react";

type SideBarProps = {
  setIsHidden: (isHidden: boolean) => void;
  isHidden: boolean;
};

const SideBar = ({ setIsHidden, isHidden }: SideBarProps) => {
  const navigate = useNavigate()

  const [isSelected, setIsSelected] = useState(sidebar[0].id)

  const hideSideBar = () => {
    setIsHidden(true)
    navigate('hide-sidebar')
  }

  const showSideBar = () => {
    setIsHidden(false)
    navigate('/')
  }

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
            <p className="font-bold text-3xl text-black">kanban</p>
          </section>
          <div className="flex flex-col justify-between flex-1">
            <section className="mr-6">
              <p className="ml-8 heading-s mb-4">ALL BOARDS (3)</p>
              <div>
                {
                  sidebar?.map((item, index) => (
                    <div key={index} onClick={() => setIsSelected(index)} className={`${isSelected === item.id ? 'bg-purple text-white' : 'text-purple'} gap-x-4 py-4 pl-8 flex items-center rounded-r-full hover:bg-purple hover:bg-opacity-10 hover:text-purple transition-all duration-200 cursor-pointer`}>
                  <img
                    className="w-4 h-4 "
                    src={item.icon}
                    alt="board"
                  />
                  <p className=" heading-m">{item.name}</p>
                </div>
                  ))
                }
                <div className="gap-x-4 py-4 pl-8 flex items-center rounded-r-full hover:bg-purple text-purple hover:bg-opacity-10 transition-all duration-200 cursor-pointer">
                  <img
                    className="w-4 h-4 "
                    src="./imgs/icon-board.svg"
                    alt="board"
                  />
                  <p className=" heading-m">+Create New Board</p>
                </div>
              </div>
            </section>
            <section className="mb-8">
              <div className="flex justify-center items-center gap-x-6 bg-light-grey rounded-[6px] py-4 px-16 mx-6 mb-2">
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
                <p className="heading-m">Hide Sidebar</p>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div onClick={showSideBar} className="fixed left-0 bottom-8 bg-purple p-[20px] rounded-r-full cursor-pointer hover:bg-purple-hover transition-opacity duration-200">
          <img
            className=""
            src="./imgs/icon-show-sidebar.svg"
            alt="show sidebar"
          />
        </div>
      )}
    </>
  );
};

export default SideBar;
