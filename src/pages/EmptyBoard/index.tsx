import Modal from "../../components/Modal";
import { useState } from "react";
import { Button } from "components/ui";
import { useLocation } from "react-router-dom";
import CreateColumn from "components/CreateColumn";

const EmptyBoard = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <div className="m-auto">
        <section className="gap-y-8 flex-col items-center flex">
          <h2 className="text-grey">
            This board is empty. Create a new column to get started.
          </h2>
          <Button
            onClick={() => setIsShowModal(true)}
            size="l"
            className="px-4"
          >
            +Add New Column
          </Button>
        </section>
      </div>
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          childComp={<CreateColumn setIsShowModal={setIsShowModal}/>}
          customStyle={`-mt-[100px] ${
            path !== "hide-sidebar" && "-ml-[300px]"
          }`}
        />
      )}
    </>
  );
};

export default EmptyBoard;
