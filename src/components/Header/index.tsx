import { useLocation } from "react-router-dom";

type HeaderProps = {
  isHidden: boolean;
};

const Header = ({ isHidden }: HeaderProps) => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  return (
    <div className="flex ">
      {path === "hide-sidebar" && (
        <section className="fixed top-0 left-0 flex items-center gap-x-4 p-8 w-[210px] h-[100px] border-light border-b-2 border-r-2">
          <div className="flex items-center gap-x-[3px]">
            <div className="w-[6px] h-6 rounded-[2px] bg-purple"></div>
            <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-75"></div>
            <div className="w-[6px] h-6 rounded-[2px] bg-purple opacity-50"></div>
          </div>
          <p className="font-bold text-3xl text-black">kanban</p>
        </section>
      )}
      <div
        className={`${
          isHidden ? "w-[calc(100%-210px)]" : "w-[calc(100%-300px)]"
        } bg-white h-[100px] fixed right-0 top-0 flex justify-between items-center px-6 border-light border-b-2`}
      >
        <p className="text-black text-[24px] heading-xl">Platform Launch</p>
        <div className="flex gap-x-6 items-center">
          <button
            disabled
            className="btn-pri-l w-[170px] cursor-pointer opacity-25"
          >
            +Add New Task
          </button>
          <img
            className="w-1 h-[17px] cursor-pointer"
            src="./imgs/icon-vertical-ellipsis.svg"
            alt="icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
