import EmptyBoard from "pages/EmptyBoard";
import { useParams } from "react-router-dom";
import "./style.css";
import { useBoard } from "hooks/useBoard";
import { Items, MultipleContainers } from "components/DnD/MultipleContainers";
import {
  deleteColumn,
  updateBoardColumnsOrder,
  updateColumnTaskIds,
  updateTaskStatus,
} from "redux/boardSlice";
import { useAppDispatch } from "hooks/redux";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";

const TaskColumn = () => {
  // get a prop from context of Outlet

  const { boardId } = useParams();
  const id = parseInt(boardId!);

  const dispatch = useAppDispatch();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const board = useBoard(id);

  if (!board) return <div>Board not found</div>;

  const items = board.columns.reduce((acc, column) => {
    acc[`Column-${column.id}`] = column.tasks.map((task) => task.id);
    return acc;
  }, {} as Items);

  const onItemsChange: React.Dispatch<React.SetStateAction<Items>> = (
    newItems
  ) => {
    let tempItems: Items = {};

    if (typeof newItems === "function") {
      tempItems = newItems(items);
    } else {
      tempItems = newItems;
    }

    // {
    //   "Column-1": [1, 2, 3]
    //   "Column-2": [4]
    //   "Column-3": [5]
    // }

    for (const columnId in tempItems) {
      const taskIds = tempItems[columnId].map((taskId) =>
        parseInt(taskId.toString())
      );
      const [, columnIdNumber] = columnId.split("-");

      // update column tasks in redux
      dispatch(
        updateColumnTaskIds({
          columnId: parseInt(columnIdNumber),
          taskIds,
        })
      );
    }

    console.log("Items ", items);
    console.log("New Items ", tempItems);

    for (const i in items) {
      console.log("Old Task Length ", items[i].length);
    }

    let newColumnId = 0;
    for (const colId in tempItems) {
      console.log("New Task Length ", tempItems[colId].length);
      if (tempItems[colId].length === items[colId].length + 1) {
        const [, columnIdNumber] = colId.split("-");
        newColumnId = parseInt(columnIdNumber);
        console.log({ newColumnId });
        break;
      }
    }

    console.log("new Column Id ", newColumnId);

    // update status of task in redux
    dispatch(updateTaskStatus({ columnId: newColumnId, taskId: +activeId! }));
  };

  const handleRemoveColumn = (columnId: number) => {
    dispatch(
      deleteColumn({
        boardId: board.id,
        columnId,
      })
    );
  };

  const handleColumnOrderChange = (columnIds: UniqueIdentifier[]) => {
    const newColumnIds = columnIds.map((columnIdString) => {
      const [, columnId] = columnIdString.toString().split("-");

      return parseInt(columnId);
    });

    dispatch(
      updateBoardColumnsOrder({
        boardId: board.id,
        columnIds: newColumnIds,
      })
    );
  };

  return (
    <>
      {board.columns.length > 0 ? (
        <div className="p-6 flex gap-x-6 whitespace-nowrap overflow-auto no-scrollbar">
          <MultipleContainers
            activeId={activeId}
            setActiveId={setActiveId}
            itemCount={15}
            scrollable
            handle
            items={items}
            setItems={onItemsChange}
            board={board}
            onDeleteColumn={handleRemoveColumn}
            onColumnOrderChange={handleColumnOrderChange}
          />
        </div>
      ) : board?.columns.length === 0 ? (
        <EmptyBoard />
      ) : null}
    </>
  );
};

export default TaskColumn;
