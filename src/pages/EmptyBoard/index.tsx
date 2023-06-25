import Modal from "../../components/Modal";
import { useState } from "react";
import { Button } from "components/ui";
import { useParams } from "react-router-dom";
import CreateColumn from "components/CreateColumn";
import { useBoard } from "hooks/useBoard";

const EmptyBoard = () => {
  const { boardId } = useParams();

  const board = useBoard(parseInt(boardId!))

  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <div className="m-auto">
        <section className="gap-y-8 flex-col items-center flex">
          <h2 className="text-grey text-center">
            This board is empty. Create a new column to get started.
          </h2>
          <Button
            onClick={() => setIsShowModal(true)}
            size="l"
            className="px-4 whitespace-nowrap"
          >
            +Add New Column
          </Button>
        </section>
      </div>
      {isShowModal && board && (
        <Modal
          setIsShowModal={setIsShowModal}
          childComp={<CreateColumn board={board} setIsShowModal={setIsShowModal}/>}
        />
      )}
    </>
  );
};

export default EmptyBoard;
