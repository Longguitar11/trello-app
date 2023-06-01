import Modal from "../../components/Modal";
import { useState } from "react";

const EmptyBoard = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <div className="m-auto">
        <section className="gap-y-8 flex-col items-center flex">
          <p className="text-grey heading-l">
            This board is empty. Create a new column to get started.
          </p>
          <button
            onClick={() => setIsShowModal(true)}
            className="btn-pri-l w-[170px] cursor-pointer hover:btn-pri-l-hover transition-all duration-200"
          >
            +Add New Column
          </button>
        </section>
      </div>
      {isShowModal && <Modal setIsShowModal={setIsShowModal} />}
    </>
  );
};

export default EmptyBoard;
