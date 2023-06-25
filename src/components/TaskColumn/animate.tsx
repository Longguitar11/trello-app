import CreateColumn from 'components/CreateColumn'
import DeleteModal from 'components/DeleteModal'
import EditTask from 'components/EditTask'
import Modal from 'components/Modal'
import ViewTask from 'components/ViewTask'
import { Board } from 'constants/board'
import { Task } from 'constants/task'
import EmptyBoard from 'pages/EmptyBoard'
import { useHidden } from 'pages/Layout'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './style.css'
import { MultipleContainers } from 'components/DnD/MultipleContainers'
import clsx from 'clsx'

const TaskColumn = () => {
  const [isCreateColumnModal, setIsCreateColumnModal] = useState(false)
  const [isViewTaskModal, setIsViewTaskModal] = useState(false)
  const [isShowEditTask, setIsShowEditTask] = useState(false)
  const [isShowDelTask, setIsShowDelTask] = useState(false)
  const [ids, setIds] = useState({ columnId: 0, taskId: 0 })

  console.log({ isViewTaskModal })

  // get a prop from context of Outlet
  const { isHidden } = useHidden()

  let { boardId } = useParams()
  const id = parseInt(boardId!)

  const boardList: Board[] = useSelector(
    (state: any) => state.boardStore.boards
  )

  // copy board
  let boardCopied = [...boardList]

  // find current board
  const board = boardCopied.find((board) => board.id === id)

  let selectedTask: Task = {
    desc: '',
    id: 0,
    status: '',
    subtasks: [],
    title: '',
  }

  const items = board?.columns.reduce((acc, column) => {
    acc[`Column-${column.id}`] = column.tasks.map((task) => task.id)
    return acc
  }, {} as any)

  return (
    <>
      {board && board?.columns.length > 0 ? (
        <>
          <MultipleContainers
            containerStyle={{
              maxHeight: '80vh',
            }}
            itemCount={15}
            scrollable
            items={items}
            board={board}
          />

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
              customStyle={`ta:-mt-[100px] -mt-[80px] ${
                !isHidden && 'ta:-ml-[300px] -ml-[260px]'
              }`}
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
              customStyle={`ta:-mt-[100px] mo:-mt-[80px] -mt-16 ${
                !isHidden && 'ta:-ml-[300px] mo:-ml-[260px]'
              }`}
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
          customStyle={`ta:-mt-[100px] mo:-mt-[80px] -mt-16 ${
            !isHidden && 'ta:-ml-[300px] mo:-ml-[260px]'
          }`}
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
          customStyle={`ta:-mt-[100px] mo:-mt-[80px] -mt-16 ${
            !isHidden && 'ta:-ml-[300px] mo:-ml-[260px]'
          }`}
        />
      )}
    </>
  )
}

export default TaskColumn
