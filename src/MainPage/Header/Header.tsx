import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        Hacker<span className={styles.logo_yellow}>News</span>
      </h1>
      <p className={styles.description}>
        A selection of the latest news in real time.
      </p>
    </header>
  );
};
