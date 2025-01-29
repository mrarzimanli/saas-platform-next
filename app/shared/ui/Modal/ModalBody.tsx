import React, { FC } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";

type ModalBodyProps = {
  children?: React.ReactNode;
  className?: string;
};

const ModalBody: FC<ModalBodyProps> = (props) => {
  const { children, className } = props;

  return <div className={classNames(styles.modal__body, className)}>{children}</div>;
};

export default ModalBody;
