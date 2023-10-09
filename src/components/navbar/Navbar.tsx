import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import SocialAccount from "../socialAccount/SocialAccount";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <SocialAccount />
        <ThemeToggle />
      </div>
      <div className={styles.logo}>
        <Link href="/">BRUADARACH.</Link>
      </div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
