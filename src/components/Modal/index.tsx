export type ModalProps = {
  isShowModal?: boolean;
  setIsShowModal: (value: boolean) => void;
  childComp?: React.ReactNode;
  customStyle?: string;
};

const Modal: React.FC<ModalProps> = ({
  setIsShowModal,
  childComp,
  customStyle,
}: ModalProps) => {
  return (
    <>
      <div
        onClick={() => {
          setIsShowModal(false);
          console.log("hide Modal");
        }}
        className={`w-screen h-screen fixed bg-black opacity-50 ${customStyle}`}
      ></div>
      <div className="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white w-[480px] p-8 rounded-[6px]">{childComp}</div>
      </div>
    </>
  );
};

export default Modal;
