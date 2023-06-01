import CreateTask from "../CreateTasks";
import { ModalProps } from "constants/modal";
import { useLocation } from "react-router-dom";

const Modal = ({ setIsShowModal }: ModalProps) => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  return (
    <>
      <div
        onClick={() => setIsShowModal(false)}
        className={`w-screen h-screen fixed bg-black opacity-50 -mt-[100px] ${
          path !== "hide-sidebar" && "-ml-[300px]"
        }`}
      ></div>
      <div
        className="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-6 rounded-[6px] bg-white p-8 w-[480px]"
      >
        <CreateTask />
      </div>
    </>
  );
};

export default Modal;
