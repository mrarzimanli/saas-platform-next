"use client";

import React, { FC } from "react";
import inputStyles from "./Input.module.scss";
import styles from "./InputGroup.module.scss";
import classNames from "classnames";

type InputGroupProps = {
  label?: string;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string;
};

const InputGroup: FC<InputGroupProps> = (props) => {
  const { children, label, prefix, suffix, error } = props;

  const cn = classNames(inputStyles.inputGroup, styles.inputGroup, !!prefix && [styles.hasPrefix, inputStyles.hasPrefix], !!suffix && [styles.hasSuffix, inputStyles.hasSuffix]);

  return (
    <div className={cn}>
      <label className={styles.inputGroup__label}>{label}</label>
      <div className={styles.inputGroup__body}>
        {prefix && <div className={styles.prefix}>{prefix}</div>}
        {children}
        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </div>
      {error && <p className={styles.inputGroup__text}>{error}</p>}
    </div>
  );
};

export default InputGroup;
