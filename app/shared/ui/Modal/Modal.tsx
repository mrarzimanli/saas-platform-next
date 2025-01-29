import React, { FC, useRef } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import useOutsideClick from "@/shared/hooks/useOutsideClick";

export type ModalColor = "default" | "danger" | "success" | "warning";
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  size?: ModalSize;
  animation?: "scale" | "translate";
  color?: ModalColor;
  children?: React.ReactNode;
  center?: boolean;
  isLoading?: boolean;
  className?: string;
}

const Modal: FC<ModalProps> = (props) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose, size = "md", color = "default", animation = "scale", isLoading = false, center, className, children } = props;

  useOutsideClick({
    ref: modalContentRef,
    handler: onClose ? onClose : () => {},
  });

  const modalClass = classNames(styles.modal, styles[size], center && styles.center, styles[color], className);
  const modalContentClass = classNames(styles.modal__content, styles[animation]);

  return isOpen ? (
    <div className={modalClass}>
      <div className={styles.modal__dialog}>
        <div
          className={modalContentClass}
          ref={modalContentRef}
        >
          {children}
          {isLoading && <div className={styles.modal__loader}>Loading...</div>}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
