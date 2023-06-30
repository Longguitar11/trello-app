import { Subtask, Task } from "constants/task";

type CardProps = {
  title?: string;
  task: Task;
  onClick: () => void;
  children?: React.ReactNode;
};

const Card = ({ task, onClick, children }: CardProps) => {
  const countSubtaskDone = (subtasks: Subtask[]) => {
    // find subtasks have an attribute called "isDone" is true
    const count = subtasks.filter((sub) => sub.isDone === true);
    return count.length;
  };

  return (
    <div
      onClick={onClick}
      className="flex justify-between py-6 px-4 w-[280px] rounded-[8px] dark:bg-dark-grey bg-white bg-opacity-9 shadow-md cursor-pointer"
    >
      <div className="truncate">
        <h3 className="dark:text-white mb-2">{task.title}</h3>
        <h4 className="text-grey">
          {countSubtaskDone(task?.subtasks)} of {task?.subtasks?.length}{" "}
          subtasks
        </h4>
      </div>
      {children}
    </div>
  );
};

export default Card;
