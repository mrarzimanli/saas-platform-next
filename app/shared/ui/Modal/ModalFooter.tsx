import React, { FC } from "react";
import styles from "./Modal.module.scss";

interface ModalFooterProps {
  buttons?: React.ReactNode;
  children?: React.ReactNode;
}

const ModalFooter: FC<ModalFooterProps> = (props) => {
  const { buttons, children } = props;

  return (
    <div className={styles.modal__footer}>
      <div className={styles.modal__footer__buttons}>{buttons}</div>
      {children}
    </div>
  );
};

export default ModalFooter;
