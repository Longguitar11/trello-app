import React, { useEffect, useState } from "react";
import classNames from "clsx";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

import { Handle, Remove } from "./components";
import { UniqueIdentifier } from "@dnd-kit/core";

import styles from "./Item.module.css";
import Card from "components/Card";
import { useTask } from "hooks/useTask";
import Modal from "components/Modal";
import ViewTask from "components/ViewTask";
import { Board } from "constants/board";
import DeleteModal from "components/DeleteModal";
import EditTask from "components/EditTask";

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: string;
  containerId?: UniqueIdentifier;
  board?: Board;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props["transform"];
    transition: Props["transition"];
    value: Props["value"];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        containerId,
        board,
        ...props
      },
      ref
    ) => {
      const task = useTask(+value);

      const columnId = containerId?.toString().split("-")[1];
      const [isViewTask, setIsViewTask] = useState(false);
      const [isShowEditTask, setIsShowEditTask] = useState(false);
      const [isShowDelTask, setIsShowDelTask] = useState(false);

      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      if (!task) {
        return <div>Task not found</div>;
      }

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <>
          <li
            className={classNames(
              styles.Wrapper,
              fadeIn && styles.fadeIn,
              sorting && styles.sorting,
              dragOverlay && styles.dragOverlay
            )}
            style={
              {
                ...wrapperStyle,
                transition: [transition, wrapperStyle?.transition]
                  .filter(Boolean)
                  .join(", "),
                "--translate-x": transform
                  ? `${Math.round(transform.x)}px`
                  : undefined,
                "--translate-y": transform
                  ? `${Math.round(transform.y)}px`
                  : undefined,
                "--scale-x": transform?.scaleX
                  ? `${transform.scaleX}`
                  : undefined,
                "--scale-y": transform?.scaleY
                  ? `${transform.scaleY}`
                  : undefined,
                "--index": index,
                "--color": color,
              } as React.CSSProperties
            }
            ref={ref}
          >
            <div
              className={
                classNames(
                  styles.Item,
                  dragging && styles.dragging,
                  handle && styles.withHandle,
                  dragOverlay && styles.dragOverlay,
                  disabled && styles.disabled,
                  color && styles.color
                ) + ` flex items-center`
              }
              style={style}
              data-cypress="draggable-item"
              {...(!handle ? listeners : undefined)}
              {...props}
              tabIndex={!handle ? 0 : undefined}
            >
              <Card task={task} onClick={() => setIsViewTask(true)} />

              <span className={styles.Actions}>
                {onRemove ? (
                  <Remove className={styles.Remove} onClick={onRemove} />
                ) : null}
                {handle ? <Handle {...handleProps} {...listeners} /> : null}
              </span>
            </div>
          </li>
          {isViewTask && (
            <Modal
              setIsShowModal={setIsViewTask}
              childComp={
                <ViewTask
                  columnId={parseInt(columnId!)}
                  currentBoard={board!}
                  isShowModal={isViewTask}
                  setIsShowModal={setIsViewTask}
                  task={task}
                  valueStates={[isShowEditTask, isShowDelTask]}
                  setStates={[setIsShowEditTask, setIsShowDelTask]}
                />
              }
            />
          )}
          {isShowEditTask && (
        <Modal
          setIsShowModal={setIsShowEditTask}
          childComp={
            <EditTask
              board={board!}
              columnId={parseInt(columnId!)}
              currentTask={task}
              setIsShowModal={setIsShowEditTask}
              setIsShowParModal={setIsViewTask}
            />
          }
          />
      )}

      {isShowDelTask && (
        <Modal
          setIsShowModal={setIsShowDelTask}
          childComp={
            <DeleteModal
              currentBoard={board!}
              columnId={parseInt(columnId!)}
              currentTask={task}
              setIsShowModal={setIsShowDelTask}
              setIsShowParModal={setIsViewTask}
            />
          }
          />
      )}
        </>
      );
    }
  )
);
