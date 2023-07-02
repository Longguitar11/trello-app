import React, { forwardRef } from "react";
import classNames from "clsx";

import { Handle, Remove } from "../Item";

import styles from "./Container.module.css";
import { colors } from "constants/color";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  tasklength?: number;
  colindex?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    const Component = onClick ? "button" : "div";

    return (
      <Component
        {...props}
        ref={ref as any}
        style={
          {
            ...style,
            "--columns": columns,
          } as React.CSSProperties
        }
        className={classNames(
          styles.Container,
          unstyled && styles.unstyled,
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-x-3">
              <div
                className={`${
                  colors[props.colindex ? props.colindex : 0].color
                } w-[15px] h-[15px] rounded-full`}
              ></div>
              <h4 className="text-grey tracking-[2.4px] uppercase">{label}</h4>
              <h4 className="text-grey tracking-[2.4px]">
                ({props.tasklength || 0})
              </h4>
            </div>
            {
              <div className={styles.Actions}>
                {onRemove ? <Remove onClick={onRemove} /> : undefined}
                <Handle {...handleProps} />
              </div>
            }
          </div>
        ) : null}
        {placeholder ? (
          <div className="flex w-[280px] h-full dark:bg-dark-grey bg-[#e9effa] bg-opacity-50 cursor-pointer rounded-[6px] text-grey hover:text-purple transition-colors duration-200">
            {children}
          </div>
        ) : (
          <ul className="space-y-[20px] max-h-calc[605.6px-24px-15px] overflow-y-auto no-scrollbar pb-[20px]">{children}</ul>
        )}
      </Component>
    );
  }
);
