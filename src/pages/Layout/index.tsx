import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import Header from "components/Header";
import SideBar from "components/SideBar";
import { useEffect, useState } from "react";
import "./style.css";
import { useBoardList } from "hooks/useBoardList";

type ContextType = { isHidden: boolean };

const Layout = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    localStorage.theme === "dark" ? true : false
  );

  const [isHidden, setIsHidden] = useState(false);

  const boardList = useBoardList();

  useEffect(() => {
    if (boardList.length > 0) {
      navigate(`${boardList[0].id}`);
    } else {
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
        className={`ta:mt-[100px] mo:mt-[80px] mt-16 ta:h-[calc(100vh-100px)] mo:h-[calc(100vh-80px)] h-[calc(100vh-64px)] dark:bg-very-dark-grey bg-light-grey flex ${
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
