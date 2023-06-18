import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import Header from "components/Header";
import SideBar from "components/SideBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Board } from "constants/board";

type ContextType = { isHidden: boolean};

const Layout = () => {
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(false);

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  );

  console.log({boardList})

  useEffect(() => {
    console.log('layout')
    if (boardList.length > 0) {
      console.log("navigate");
      navigate(`${boardList[0].id}`);
    }
  }, []);

  return (
    <div className="flex">
      <SideBar
        boards={boardList}
        setIsHidden={setIsHidden}
        isHidden={isHidden}
        sidebar={boardList}
      />
      <Header boards={boardList} isHidden={isHidden} />
      <div
        className={`mt-[100px] min-h-[calc(100vh-100px)] flex ${
          isHidden ? "w-full" : "ml-[300px] w-[calc(100%-300px)]"
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
