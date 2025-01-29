import React, { FC } from "react";
import styles from "./Modal.module.scss";
import { CloseCircleIcon } from "@/resources/icons";
import classNames from "classnames";

type ModalHeaderProps = {
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  desc?: string | React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  center?: boolean;
  className?: string;
};

export const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const { icon, title, desc, onClose, children, center, className } = props;

  return (
    <div className={classNames(styles.modal__header, center && styles.center, className)}>
      {children ?? (
        <>
          {icon && <div className={styles.modal__header__icon}>{icon}</div>}
          {title && <span className={styles.modal__header__title}>{title}</span>}
          {desc && <p className={styles.modal__header__desc}>{desc}</p>}
        </>
      )}
      <button
        className={styles.modal__close}
        onClick={onClose}
      >
        <CloseCircleIcon />
      </button>
    </div>
  );
};

export default ModalHeader;
