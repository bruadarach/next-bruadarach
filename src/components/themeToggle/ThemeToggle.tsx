"use client";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./themeToggle.module.css";
import Image from "next/image";

const ThemeToggle = () => {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#021c1c" }
      }
    >
      <Image
        src="/moon.png"
        alt="dark mode"
        width={14}
        height={14}
        style={{ marginLeft: "2px" }}
      />
      <div
        className={styles.circle}
        style={
          theme === "dark"
            ? { left: 2, background: "#021c1c" }
            : { right: 3, background: "white" }
        }
      ></div>
      <Image
        src="/sun.png"
        alt="light mode"
        width={14}
        height={14}
        style={{ marginRight: "4px" }}
      />
    </div>
  );
};

export default ThemeToggle;
