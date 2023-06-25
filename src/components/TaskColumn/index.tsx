import Card from "components/Card";
import CreateColumn from "components/CreateColumn";
import DeleteModal from "components/DeleteModal";
import EditTask from "components/EditTask";
import Modal from "components/Modal";
import ViewTask from "components/ViewTask";
import { colors } from "constants/color";
import { Task } from "constants/task";
import EmptyBoard from "pages/EmptyBoard";
import { useHidden } from "pages/Layout";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './style.css'
import { useBoard } from "hooks/useBoard";

const TaskColumn = () => {
  const [isCreateColumnModal, setIsCreateColumnModal] = useState(false);
  const [isViewTaskModal, setIsViewTaskModal] = useState(false);
  const [isShowEditTask, setIsShowEditTask] = useState(false);
  const [isShowDelTask, setIsShowDelTask] = useState(false);
  const [ids, setIds] = useState({ columnId: 0, taskId: 0 });

  console.log({ isViewTaskModal });

  // get a prop from context of Outlet
  const { isHidden } = useHidden();

  const { boardId } = useParams();
  const id = parseInt(boardId!);

  const board = useBoard(id)

  console.log({
    board
  })

  let selectedTask: Task = {
    desc: "",
    id: 0,
    status: "",
    subtasks: [],
    title: "",
  };

  return (
    <>
      {board && board?.columns.length > 0 ? (
        <>
          <div className="p-6 flex gap-x-6 whitespace-nowrap overflow-auto no-scrollbar">
            {board?.columns?.map((column, index) => (
              <section key={column.id} className="w-[280px]">
                <div className="flex items-center gap-x-3 mb-6">
                  <div
                    className={`${colors[index].color} w-[15px] h-[15px] rounded-full`}
                  ></div>
                  <h4 className="text-grey">{column.name}</h4>
                  <h4 className="text-grey">( {column.tasks.length || 0} )</h4>
                </div>
                <div className="space-y-[20px]">
                  {column.tasks?.map((task) => {
                    if (ids.taskId === task.id && ids.columnId === column.id)
                      selectedTask = task;
                    return (
                      <Card
                        onClick={() => {
                          setIsViewTaskModal(true);
                          setIds({ columnId: column.id, taskId: task.id });
                        }}
                        key={task.id}
                        title={task.title}
                        task={task}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
            <div
              onClick={() => setIsCreateColumnModal(true)}
              className="flex w-[280px] mb-[50px] dark:bg-dark-grey bg-[#e9effa] bg-opacity-50 cursor-pointer rounded-[6px] text-grey hover:text-purple transition-colors duration-200"
            >
              <h1 className="m-auto">+ New Column</h1>
            </div>
          </div>

          {/* Show Create Column Modal */}
          {isCreateColumnModal && (
            <Modal
              setIsShowModal={setIsCreateColumnModal}
              childComp={
                <CreateColumn
                  board={board}
                  setIsShowModal={setIsCreateColumnModal}
                />
              }
              customStyle={`ta:-mt-[100px] -mt-[80px] ${!isHidden && "ta:-ml-[300px] -ml-[260px]"}`}
            />
          )}

          {/* Show View Task Modal */}
          {isViewTaskModal && !isShowDelTask && !isShowEditTask && (
            <Modal
              setIsShowModal={setIsViewTaskModal}
              childComp={
                <ViewTask
                  valueStates={[isShowEditTask, isShowDelTask]}
                  setStates={[setIsShowEditTask, setIsShowDelTask]}
                  isShowModal={isViewTaskModal}
                  setIsShowModal={setIsViewTaskModal}
                  task={selectedTask}
                  columnId={ids.columnId}
                  currentBoard={board}
                />
              }
              customStyle={`ta:-mt-[100px] mo:-mt-[80px] -mt-16 ${!isHidden && "ta:-ml-[300px] mo:-ml-[260px]"}`}
            />
          )}
        </>
      ) : board?.columns.length === 0 ? (
        <EmptyBoard />
      ) : null}

      {isShowEditTask && (
        <Modal
          setIsShowModal={setIsShowEditTask}
          childComp={
            <EditTask
              board={board!}
              boards={boardList}
              columnId={ids.columnId}
              currentTask={selectedTask}
              setIsShowModal={setIsShowEditTask}
              setIsShowParModal={setIsViewTaskModal}
            />
          }
          customStyle={`ta:-mt-[100px] mo:-mt-[80px] -mt-16 ${!isHidden && "ta:-ml-[300px] mo:-ml-[260px]"}`}
          />
      )}

      {isShowDelTask && (
        <Modal
          setIsShowModal={setIsShowDelTask}
          childComp={
            <DeleteModal
              currentBoard={board!}
              columnId={ids.columnId}
              currentTask={selectedTask}
              setIsShowModal={setIsShowDelTask}
              setIsShowParModal={setIsViewTaskModal}
            />
          }
          customStyle={`ta:-mt-[100px] mo:-mt-[80px] -mt-16 ${!isHidden && "ta:-ml-[300px] mo:-ml-[260px]"}`}
          />
      )}
    </>
  );
};

export default TaskColumn;
