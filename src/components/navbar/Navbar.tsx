import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import SocialAccount from "../socialAccount/SocialAccount";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900", "1000"],
});

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <SocialAccount />
        <ThemeToggle />
      </div>
      <div className={styles.logo}>BRUADARACH.</div>
      <div className={`${styles.links} ${nunitoSans.className}`}>
        <Link href="/" className={styles.link}>
          About
        </Link>
        <Link href="/" className={styles.link}>
          Contact
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
