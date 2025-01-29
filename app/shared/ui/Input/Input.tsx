"use client";

import React, { useId, forwardRef } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

type InputColor = "default" | "danger" | "warning" | "success";
type InputType = "checkbox" | "color" | "date" | "email" | "file" | "hidden" | "number" | "password" | "radio" | "range" | "search" | "tel" | "text" | "time" | "textarea";
type InputSize = "xs" | "sm" | "md" | "lg" | "xl";
type InputDesignType = "primary" | "secondary";

type InputProps = {
  name: string;
  type?: InputType;
  designType?: InputDesignType;
  size?: InputSize;
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  color?: InputColor;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

// Forward ref to Input component
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>((props, ref) => {
  const id = props.id || useId();

  const { name, type = "text", designType = "primary", size = "md", label, placeholder, value, defaultValue, readOnly, required, disabled, autoComplete = "on", prefix, suffix, color = "default", error, maxLength, onChange, onKeyDown, onFocus, className } = props;

  const cn = classNames(styles.form__control, styles[type], styles[designType], styles[size], styles[color], disabled && styles.disabled, readOnly && styles.readonly, !!prefix && styles.hasPrefix, !!suffix && styles.hasSuffix);

  return (
    <div className={classNames(styles.form__group, className)}>
      {label && (
        <label
          className={styles.form__label}
          htmlFor={id}
        >
          {label}
          {required && "*"}
        </label>
      )}
      <div className={cn}>
        {prefix && <span className={classNames(styles.form__control__icon, styles.prefix)}>{prefix}</span>}
        {type === "textarea" ? (
          <textarea
            name={name}
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete={autoComplete}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
          />
        ) : (
          <input
            name={name}
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete={autoComplete}
            maxLength={maxLength}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
          />
        )}
        {suffix && <span className={classNames(styles.form__control__icon, styles.suffix)}>{suffix}</span>}
        {error && <p className={styles.form__control__text}>{error}</p>}
      </div>
    </div>
  );
});

export default Input;
