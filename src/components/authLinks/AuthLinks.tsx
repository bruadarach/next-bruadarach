"use client";

import React, { useState } from "react";
import styles from "./authLinks.module.css";
import Link from "next/link";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  // temporary
  const status = "notauthentiated";

  return (
    <>
      {status === "notauthentiated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link}>Logout</span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "notauthentiated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
          <div className={styles.borderLine}></div>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Food</Link>
          <Link href="/">Travel</Link>
          <Link href="/">Culture</Link>
          <Link href="/">Coding</Link>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
