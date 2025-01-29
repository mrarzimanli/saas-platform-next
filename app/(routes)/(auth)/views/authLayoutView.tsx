import style from "../shared/styles/layout.module.scss";

export default function AuthLayoutView({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={style.layout}>{children}</div>;
}
