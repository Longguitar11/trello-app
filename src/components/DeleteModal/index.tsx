import { Button } from 'components/ui'
import { useDispatch } from 'react-redux'
import { removeABoard, removeATask } from 'redux/boardSlice'

type DeleteModalProps = {
    boardId?: number
    columnId?: number
    taskId?: number
    setIsShowModal: (value: boolean) => void
}

const DeleteModal = ({boardId, columnId, taskId, setIsShowModal}: DeleteModalProps) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        if(boardId && boardId >= 0 && !columnId && !taskId)
        dispatch(removeABoard({id: boardId}))
        else 
        dispatch(removeATask({boardId,columnId,taskId}))

        setIsShowModal(false)
    }

  return (
    <div className='space-y-6'>
        <h2>Delete this ...</h2>
        <p className='text-grey'>Are you sure you want to delete the 'Platform Launch' board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className='flex justify-between gap-x-4'>
            <Button onClick={handleDelete} className='w-full' variant={'destructive'}>Delete</Button>
            <Button className='w-full' variant={'secondary'}>Cancel</Button>
        </div>
    </div>
  )
}

export default DeleteModal