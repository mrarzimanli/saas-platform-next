import React, { FC } from "react";
import styles from "./Form.module.scss";

type FormHeaderProps = {
  children?: React.ReactNode;
  title?: string;
  desc?: string;
  icon?: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

const FormHeader: FC<FormHeaderProps> = ({ children, icon, title, desc, ...rest }) => {
  return (
    <div className={styles.form__header} {...rest}>
      {icon && <div className={styles.form__header__icon}>{icon}</div>}
      <div className={styles.form__header__content}>
        {title && <div className={styles.form__header__title}>{title}</div>}
        {desc && <div className={styles.form__header__desc}>{desc}</div>}
      </div>
      {children}
    </div>
  );
};

export default FormHeader;
