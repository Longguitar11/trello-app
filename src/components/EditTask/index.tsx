import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Label } from '../ui'
import { Textarea } from '../ui/textarea'
import { useDispatch } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import { Board } from 'constants/board'
import { TaskForm, TaskSchema } from 'components/CreateTasks'
import { Task } from 'constants/task'
import { updateTask } from 'redux/boardSlice'
import { useEffect } from 'react'

export type EditTaskFormProps = {
  onSubmit?: (task: TaskForm) => void
  mode?: 'create' | 'edit'
  submitting?: boolean
  submitText?: string
  submittingText?: string
  initialData?: Partial<TaskForm>
  setIsShowModal: (value: boolean) => void
  setIsShowParModal: (value: boolean) => void
  board: Board
  columnId: number
  currentTask: Task
}

const EditTask = ({
  onSubmit,
  currentTask,
  initialData = {
    title: currentTask?.title,
    desc: currentTask?.desc,
    subtasks: currentTask?.subtasks,
    status: currentTask?.status,
  },
  setIsShowModal,
  setIsShowParModal,
  board,
}: EditTaskFormProps) => {
  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(TaskSchema),
    mode: 'onChange',
    defaultValues: initialData,
  })

  // use useFieldArray for subtasks
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  })

  onSubmit = (task: TaskForm) => {
    // the task will be appended to corresponding to its column
    const output = {
      id: currentTask?.id,
      ...task,
    }

    dispatch(updateTask(output))
    setIsShowModal(false)
  }

  useEffect(() => {
    setIsShowParModal(false)
  
    return () => {
      setIsShowParModal(true)

    }
  }, [])
  

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="dark:text-white">Edit Task</h2>
      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="title">
          Title
        </Label>
        <Input
          id="title"
          {...register('title', { required: true })}
          placeholder="e.g. Learn English"
        />
        {errors.title && (
          <p className="text-red" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="desc">
          Description
        </Label>
        <Textarea
          {...register('desc', { required: true })}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          id="desc"
        />
        {errors.desc && (
          <p className="text-red" role="alert">
            {errors.desc.message}
          </p>
        )}
      </div>
      <div className="space-y-2 flex flex-col">
        <Label className="text-sm font-bold dark:text-white" htmlFor="subtasks">
          Subtasks
        </Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-x-4 items-center">
            <Input
              {...register(`subtasks.${index}.title`)}
              id="subtasks"
              type="text"
              placeholder="e.g. Make coffee"
            />
            <img
              onClick={() => {
                remove(index)
              }}
              className="w-4 h-4 cursor-pointer"
              src="./imgs/icon-cross.svg"
              alt="cross"
            />
          </div>
        ))}
        {errors.subtasks && (
          <p className="text-red" role="alert">
            The title of subtask cannot be empty
          </p>
        )}

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            append({
              id: new Date().getTime(),
              title: '',
              isDone: false,
            })
          }}
        >
          +Add New Subtask
        </Button>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="status">
          Status
        </Label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              // defaultValue={boards?.columns[0].name}
              value={field.value}
              onValueChange={(value) => {
                field.onChange({
                  target: {
                    value: value,
                  },
                })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the status of the task" />
              </SelectTrigger>
              <SelectContent>
                {board.columns.map((column) => (
                  <SelectItem key={column.id} value={column.id.toString()}>
                    {column.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-red" role="alert">
            {errors.status.message}
          </p>
        )}
      </div>
      <Button className="w-full" type="submit">
        Save Changes
      </Button>
    </form>
  )
}

export default EditTask
