import React, { FC } from "react";
import styles from "./Form.module.scss";

type FormProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

const Form: FC<FormProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.form} {...rest}>
      {children}
    </div>
  );
};

export default Form;
