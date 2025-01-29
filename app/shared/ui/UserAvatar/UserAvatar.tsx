import React, { FC } from "react";
import styles from "./UserAvatar.module.scss";
import { ProfileIcon } from "@/resources/icons";
import classNames from "classnames";
import { getInitials } from "@/shared/utils/getInitials";

type UserAvatarType = "primary" | "secondary" | "tertiary";

type UserAvatarProp = {
  thumb?: string;
  icon?: React.ReactNode;
  label?: string;
  type?: UserAvatarType;
  size?: number;
  onClick?: () => void;
} & React.ComponentPropsWithRef<"div">;

const UserAvatar: FC<UserAvatarProp> = (props) => {
  const { thumb, icon = <ProfileIcon />, label, type = "primary", size = 44, onClick, ...rest } = props;

  const cn = classNames(styles.avatar, styles[type]);

  const customStyles = {
    width: size,
    height: size,
    cursor: onClick ? "pointer" : "default",
  };

  const imageSrc = `data:image/png;base64,${thumb}`;

  return (
    <div
      className={cn}
      onClick={onClick}
      style={customStyles}
      {...rest}
    >
      {thumb ? (
        <img
          src={imageSrc}
          alt="Image"
        />
      ) : label ? (
        getInitials(label)
      ) : (
        icon
      )}
    </div>
  );
};

export default UserAvatar;
