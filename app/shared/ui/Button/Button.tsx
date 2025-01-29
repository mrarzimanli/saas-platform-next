import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";
import Link from "next/link";
// import Spinner from "../../../assets/icons/spinner";

export type ButtonColor = "default" | "danger" | "success" | "warning" | "sky-blue" | "white" | "green" | "gray";
export type ButtonType = "primary" | "secondary" | "tertiary" | "text" | "label" | "transparent";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonOwnProps<C extends React.ElementType> = {
  as?: C;
  color?: ButtonColor;
  designType?: ButtonType;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  showBadge?: boolean;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler;
};

export type ButtonProps<C extends React.ElementType> = ButtonOwnProps<C> & Omit<React.ComponentProps<C>, keyof ButtonOwnProps<C>>;

function Button<C extends React.ElementType = "button">(props: ButtonProps<C>) {
  const { as: Component = "button", children, color = "default", designType = "primary", size = "md", loading = false, disabled = false, showBadge = false, prefix, suffix, className, onClick, ...rest } = props;

  const ComponentType = Component as React.ElementType;

  const cn = classNames(styles.button, styles[size], styles[color], styles[designType], loading && styles.loading, disabled && styles.disabled, className);

  return (
    <React.Fragment>
      {ComponentType === "link" ? (
        <Link
          href="#"
          className={cn}
          {...rest}
        >
          {prefix}
          {children}
          {suffix}
          {loading && <span className={styles.loader}>{/* <Spinner /> */}</span>}
          {showBadge && <span className={styles.badge}></span>}
        </Link>
      ) : (
        <ComponentType
          className={cn}
          onClick={!disabled ? onClick : undefined}
          disabled={disabled}
          {...rest}
        >
          {prefix}
          {children}
          {suffix}
          {loading && <span className={styles.loader}>{/* <Spinner /> */}</span>}
          {showBadge && <span className={styles.badge}></span>}
        </ComponentType>
      )}
    </React.Fragment>
  );
}

export default Button;
