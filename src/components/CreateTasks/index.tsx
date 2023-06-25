import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { useState } from 'react'
import { Task } from 'constants/task'
import { addTask } from 'redux/boardSlice'

export const TaskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  desc: z.string().min(1, { message: 'Description is required' }),
  subtasks: z.array(
    z.object({
      id: z.number(),
      title: z.string().min(1, { message: 'Title of subtask cannot be empty' }),
      isDone: z.boolean(),
    })
  ),
  status: z.string().min(1, {
    message: 'The character length of status must be greater than 1',
  }),
})

export type TaskForm = z.infer<typeof TaskSchema>

export type TaskFormProps = {
  onSubmit?: (task: TaskForm) => void
  mode?: 'create' | 'edit'
  submitting?: boolean
  submitText?: string
  submittingText?: string
  initialData?: Partial<TaskForm>
  setIsShowModal: (value: boolean) => void
  board: Board
}

const CreateTask = ({
  onSubmit,
  initialData = {
    subtasks: [{ id: 0, title: '', isDone: false }],
    status: 'todo',
  },
  setIsShowModal,
  board,
}: TaskFormProps) => {
  const dispatch = useDispatch()

  console.log('board in create task ', board)

  console.log('rerender')

  const [subtaskId, setSubtaskId] = useState(0)

  console.log('current subtask id ', subtaskId)

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
    const newTask: Task = {
      id: new Date().getTime(),
      ...task,
    }

    dispatch(addTask(newTask))

    setIsShowModal(false)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="dark:text-white">Add New Task</h2>
      <div className="space-y-2">
        <Label className="text-sm font-bold dark:text-white" htmlFor="title">
          Title
        </Label>
        <Input
          id="title"
          autoFocus
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
      <div className="space-y-2">
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
                fields.length === 1 && setSubtaskId(0)
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
            setSubtaskId((pre) => pre + 1)
            append({ id: subtaskId + 1, title: '', isDone: false })
            console.log('add subtask id ', subtaskId)
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
                {board?.columns.map((column) => (
                  <SelectItem key={column.id} value={column.name}>
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
        Create Task
      </Button>
    </form>
  )
}

export default CreateTask
