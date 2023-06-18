import { Dropdown } from "constants/dropdown";

type DropdownProps = {
  data: Dropdown[];
  // setIsShowEditModal: (value: boolean) => void
  // setIsShowDelModel: (value:boolean) => void
  setIsShowModal: ((value: boolean) => void)[]
  setIsShowDropdown: (value: boolean) => void;
};

const Dropdown = ({
  data,
  setIsShowModal,
  setIsShowDropdown,
}: DropdownProps) => {
  const handleClick = (id: number) => {
    setIsShowDropdown(false);

    // id = 0: show edit modal, id = 1: show delete modal
    setIsShowModal[id](true);
  };
  return (
    <div className="w-[192px] shadow-md bg-white p-4 rounded-[8px] absolute top-16 space-y-4">
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
