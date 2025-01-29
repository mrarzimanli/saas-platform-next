"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import useOutsideClick from "@/shared/hooks/useOutsideClick";
import { ChevronDownFilled } from "@/resources/icons";
import classNames from "classnames";
import styles from "./Dropdown.module.scss";
import inputStyles from "@/shared/ui/Input/Input.module.scss";

type DropdownSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface DropdownItem {
  id: number | string;
  text?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  key?: string;
}

export type DropdownProps = {
  data: DropdownItem[];
  placeholder?: string;
  label?: string;
  position?: "bottom" | "top";
  height?: number;
  onSelect?: (id: string | number) => void;
  className?: string;
  error?: string;
  name: string;
  size?: DropdownSize;
  defaultValue?: DropdownItem;
  readOnly?: boolean;
  required?: boolean;
};

const Dropdown: FC<DropdownProps> = (props) => {
  const { placeholder = "Seçim edin", position = "bottom", height, label, data, error, name, size = "md", required = false, readOnly = false, onSelect, className, defaultValue } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>();
  const id = useId();

  const handleChange = (item: DropdownItem) => {
    onSelect && onSelect(item.id);
    setSelectedItem(item);
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const cnDropdown = classNames(styles.dropdown, isOpen && styles.isOpen, styles[position], styles[size], readOnly && styles.readOnly, className);

  useEffect(() => {
    if (data && defaultValue) {
      const selectedValue = data?.find((item) => item.selected || item.id == defaultValue?.id);
      setSelectedItem(selectedValue);
    }
  }, [data, defaultValue]);

  return (
    <div className={inputStyles.form__group}>
      {label && (
        <label
          className={inputStyles.form__label}
          htmlFor={id}
        >
          {label} {required && "*"}
        </label>
      )}
      <div
        id={id}
        ref={dropdownRef}
        className={cnDropdown}
      >
        <button
          className={styles.dropdown__header}
          type="button"
          onClick={readOnly ? () => {} : () => setIsOpen(!isOpen)}
        >
          {selectedItem?.text ? <span className={styles.dropdown__header__title}>{selectedItem.text}</span> : <span className={styles.dropdown__header__placeholder}>{placeholder}</span>}
          {!readOnly && <ChevronDownFilled className={styles.dropdown__header__arrow} />}
        </button>
        {!readOnly && isOpen && (
          <div
            className={styles.dropdown__body}
            style={{ maxHeight: height }}
          >
            <ul className={styles.dropdown__list}>
              {data?.map((item) => (
                <li
                  key={item.id}
                  className={classNames(styles.dropdown__list__item, selectedItem?.id === item.id && styles.selected)}
                  onClick={() => handleChange(item)}
                >
                  {item?.icon && item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <p className={styles.dropdown__text}>{error}</p>}
      </div>
    </div>
  );
};

export default Dropdown;
