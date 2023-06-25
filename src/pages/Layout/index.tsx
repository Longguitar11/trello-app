import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Header from "components/Header";
import SideBar from "components/SideBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Board } from "constants/board";
import "./style.css";

type ContextType = { isHidden: boolean };

const Layout = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const id = boardId && parseInt(boardId);
  const [isDark, setIsDark] = useState(
    localStorage.theme === "dark" ? true : false
  );

  const [isHidden, setIsHidden] = useState(false);

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  );

  const board = boardList.filter((board) => board.id === id)[0];
  console.log("layout board ", board);

  console.log({ boardList });

  useEffect(() => {
    console.log("layout");
    if (boardList.length > 0) {
      console.log("navigate");
      navigate(`${boardList[0].id}`);
    } else {
      console.log("navigate to home");
      navigate("/");
    }
  }, []);

  return (
    <div className="flex no-scrollbar">
      <SideBar
        boards={boardList}
        setIsHidden={setIsHidden}
        isHidden={isHidden}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <Header
        currentBoard={board}
        boards={boardList}
        isHidden={isHidden}
        sideBarData={{
          setIsHidden,
          isHidden,
          isDark,
          setIsDark,
        }}
      />
      <div
        className={`ta:mt-[100px] mo:mt-[80px] mt-16 ta:min-h-[calc(100vh-100px)] mo:min-h-[calc(100vh-80px)] min-h-[calc(100vh-64px)] dark:bg-very-dark-grey bg-light-grey flex ${
          isHidden
            ? "min-w-full"
            : "ta:ml-[300px] mo:ml-[260px] ta:min-w-[calc(100%-300px)] mo:min-w-[calc(100%-260px)] w-full no-scrollbar"
        }`}
      >
        <Outlet context={{ isHidden, setIsHidden }} />
      </div>
    </div>
  );
};

export const useHidden = () => {
  return useOutletContext<ContextType>();
};

export default Layout;
