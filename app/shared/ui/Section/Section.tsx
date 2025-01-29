"use client";
import React, { FC } from "react";
import styles from "./Section.module.scss";

type SectionProps = {
  children: React.ReactNode;
};

const Section: FC<SectionProps> = ({ children }) => {
  return <div className={styles.section}>{children}</div>;
};

export default Section;
