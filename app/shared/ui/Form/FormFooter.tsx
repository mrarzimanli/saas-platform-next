import React, { FC } from "react";
import styles from "./Form.module.scss";

type FormFooterProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

const FormFooter: FC<FormFooterProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.form__footer} {...rest}>
      {children}
    </div>
  );
};

export default FormFooter;
