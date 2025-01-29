import React, { FC } from "react";
import { EyeClosedIcon, EyeIcon } from "@/resources/icons";
import style from "./PasswordTrigger.module.scss";

type PasswordTrigger = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordTrigger: FC<PasswordTrigger> = ({ showPassword, setShowPassword }) => {
  return showPassword ? (
    <EyeIcon
      className={style.icon}
      onClick={() => setShowPassword(!showPassword)}
    />
  ) : (
    <EyeClosedIcon
      className={style.icon}
      onClick={() => setShowPassword(!showPassword)}
    />
  );
};

export default PasswordTrigger;
