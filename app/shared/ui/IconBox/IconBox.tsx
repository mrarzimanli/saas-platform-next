import classNames from "classnames";
import React, { FC } from "react";
import styles from "./IconBox.module.scss";

export type IconBoxColor = "white" | "blue" | "green" | "sky" | "pink" | "orange" | "red" | "gray" | "darkBlue";
export type IconBoxType = "primary" | "secondary" | "tertiary";

type IconBoxProps = {
  icon: React.ReactNode;
  type?: IconBoxType;
  color?: IconBoxColor;
  size?: number;
  badge?: boolean;
};

const IconBox: FC<IconBoxProps> = (props) => {
  const { icon, type = "primary", color = "white", size, badge } = props;

  const cn = classNames(styles.box, styles[color], styles[type]);

  return (
    <div
      className={cn}
      style={{ width: size, height: size }}
    >
      {icon}
      {badge && <span className={styles.badge}></span>}
    </div>
  );
};

export default IconBox;
