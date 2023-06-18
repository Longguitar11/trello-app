import { Subtask, Task } from "constants/task";

type CardProps = {
  title: string;
  task: Task
  onClick: () => void;
};

const Card = ({
  title,
  task,
  onClick,
}: CardProps) => {
  const countSubtaskDone = (subtasks: Subtask[]) => {
    // find subtasks have an attribute called "isDone" is true
    const count = subtasks.filter((sub) => sub.isDone === true);
    return count.length;
  };

  return (
    <div
      onClick={onClick}
      className="py-6 px-4 w-[280px] rounded-[8px] bg-white bg-opacity-9 shadow-md cursor-pointer"
    >
      <h3 className="mb-2">{title}</h3>
      <h4 className="text-grey ">
        {countSubtaskDone(task?.subtasks)} of {task?.subtasks?.length} subtasks
      </h4>
    </div>
  );
};

export default Card;
