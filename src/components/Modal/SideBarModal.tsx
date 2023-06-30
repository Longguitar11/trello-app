export type SideBarModalProps = {
  isShowModal?: boolean;
  setIsShowModal: (value: boolean) => void;
  childComp?: React.ReactNode;
  customStyle?: string;
};

const SideBarModal: React.FC<SideBarModalProps> = ({
  setIsShowModal,
  childComp,
  customStyle,
}: SideBarModalProps) => {
  return (
    <div className="z-10">
      <div
        onClick={() => {
          setIsShowModal(false);
          console.log("hide Modal");
        }}
        className={`w-screen h-screen fixed bg-black opacity-50 ${customStyle}`}
      ></div>
      <div className="fixed z-10 left-1/2 top-20 mo:top-1/2 -translate-x-1/2 mo:-translate-y-1/2">
        <div className="bg-white dark:bg-dark-grey w-[264px] mo:w-[480px] mo:p-8 rounded-[6px]">
          {childComp}
        </div>
      </div>
    </div>
  );
};

export default SideBarModal;
