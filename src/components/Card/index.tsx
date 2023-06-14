type CardProps = {
    title: string
    subtaskLength: number
    completedSubtask?: number
}

const Card = ({title, subtaskLength, completedSubtask}:CardProps) => {
  return (
    <div className="py-6 px-4 w-[280px] rounded-[8px] bg-white bg-opacity-9 shadow-md">
      <h3 className="mb-2">{title}</h3>
      <h4 className="text-grey ">{completedSubtask || 0} of {subtaskLength} subtasks</h4>
    </div>
  );
};

export default Card;
