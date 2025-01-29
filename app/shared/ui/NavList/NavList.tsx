"use client";
import React, { FC } from "react";
import styles from "./NavList.module.scss";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "@/resources/icons";

interface ListItem {
  id?: string;
  title?: string;
  desc?: string;
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  badge?: string;
  onClick?: () => void;
}

type NavListProps = {
  list: ListItem[];
};

const NavList: FC<NavListProps> = (props) => {
  const { list } = props;
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.includes(path);
  };

  return (
    <div className={styles.navList}>
      {list.map((item, index) =>
        item?.href ? (
          <Link
            key={index}
            className={classNames(styles.navList__item, isActive(item.href) && styles.active, item.disabled && styles.disabled)}
            href={item?.href}
          >
            {item?.icon && <span className={styles.navList__item__icon}>{item?.icon}</span>}
            {item?.title && (
              <div className={styles.navList__item__content}>
                <span className={styles.navList__item__title}>{item?.title}</span>
                {item?.desc && <span className={styles.navList__item__desc}>{item?.desc}</span>}
              </div>
            )}
            {item?.badge && <span className={styles.navList__item__badge}>{item?.badge}</span>}
            <ArrowRightIcon className={styles.navList__item__arrow} />
          </Link>
        ) : (
          <button
            id={item?.title}
            key={index}
            className={styles.navList__item}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item?.icon && item?.icon}
            {item?.title && (
              <div className={styles.navList__item__content}>
                <span className={styles.navList__item__title}>{item?.title}</span>
                <span className={styles.navList__item__desc}>{item?.desc}</span>
              </div>
            )}
            {item?.badge && <span className={styles.navList__item__badge}>{item?.badge}</span>}
            <ArrowRightIcon className={styles.navList__item__arrow} />
          </button>
        )
      )}
    </div>
  );
};

export default NavList;
