import { columns } from "../../constants/columns";
import { useState } from "react";


const Dropdown = ({}) => {
  const [selectedItem, setSelectedItem] = useState(columns[0].id);
  const [isDrop, setIsDrop] = useState(false);

  return (
    <>
      <div className="w-full border-2 border-light-grey py-2 rounded-[4px] flex justify-between px-4 items-center">
        <p>{columns[selectedItem].name}</p>
        {!isDrop ? (
          <div
            className="flex p-1 rounded-full hover:bg-slate-100 transition-colors duration-200"
            onClick={() => setIsDrop(true)}
          >
            <img
              className="cursor-pointer m-auto"
              src="./imgs/icon-chevron-down.svg"
              alt="down"
            />
          </div>
        ) : (
          <div
            className="flex p-1 rounded-full hover:bg-slate-100 transition-colors duration-200"
            onClick={() => setIsDrop(true)}
          >
            <img
              onClick={() => setIsDrop(false)}
              className="cursor-pointer m-auto"
              src="./imgs/icon-chevron-up.svg"
              alt="up"
            />
          </div>
        )}
      </div>
      {isDrop && (
        <div className="bg-white shadow-md w-[calc(100%-64px)] fixed">
          {columns.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItem(index);
                setIsDrop(false);
              }}
              className={`pl-[18px] text-grey text-sm py-3 cursor-pointer hover:bg-purple hover:text-white transition-all duration-200 ${
                item.id === selectedItem && "text-white bg-purple"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dropdown;
