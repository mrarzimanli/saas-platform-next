import React, { FC } from "react";
import styles from "./Form.module.scss";

type FormBodyProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

const FormBody: FC<FormBodyProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.form__body} {...rest}>
      {children}
    </div>
  );
};

export default FormBody;
