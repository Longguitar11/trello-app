import { Dropdown } from "constants/dropdown";

type DropdownProps = {
  data: Dropdown[];
  setIsShowModal: ((value: boolean) => void)[];
  setIsShowDropdown: (value: boolean) => void;
  customStyle: string;
  // countModal?: number
  // setCountModal?: (value: number) => void
};

const Dropdown = ({
  data,
  setIsShowModal,
  setIsShowDropdown,
  customStyle,
  // countModal,
  // setCountModal
}: DropdownProps) => {
  const handleClick = (id: number) => {
    setIsShowDropdown(false);

    // id = 0: show edit modal, id = 1: show delete modal
    setIsShowModal[id](true);

    // if(setCountModal && countModal && countModal>0){
    //   setCountModal(countModal + 1)
    // }
  };
  return (
    <div
      className={`w-[192px] shadow-md bg-white p-4 rounded-[8px] absolute space-y-4 dark:bg-very-dark-grey ${customStyle}`}
    >
      {data?.map((value) => (
        <p
          key={value.id}
          onClick={() => handleClick(value.id)}
          className={`${value.style} cursor-pointer`}
        >
          {value.name}
        </p>
      ))}
    </div>
  );
};

export default Dropdown;
