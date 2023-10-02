"use client";

import React, { useState } from "react";
import styles from "./authLinks.module.css";
import Link from "next/link";
import { AiFillCloseSquare } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  // temporary
  // const status = "unauthenticated";
  const { status } = useSession();

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link} onClick={closeMenu}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link} onClick={closeMenu}>
            Write
          </Link>
          <span className={styles.link} onClick={() => signOut()}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenus}>
          <div className={styles.icon} onClick={() => setOpen(!open)}>
            <AiFillCloseSquare onClick={closeMenu} />
          </div>
          <div className={styles.responsiveMenuWrapper}>
            <Link href="/" onClick={closeMenu}>
              Homepage
            </Link>
            <Link href="/about" onClick={closeMenu}>
              About
            </Link>
            {status === "unauthenticated" ? (
              <Link href="/login" onClick={closeMenu}>
                Login
              </Link>
            ) : (
              <>
                <Link href="/write" onClick={closeMenu}>
                  Write
                </Link>
                <span className={styles.link} onClick={closeMenu}>
                  Logout
                </span>
              </>
            )}
            <div className={styles.borderLine}></div>
            <Link href="/style" onClick={closeMenu}>
              Style
            </Link>
            <Link href="/fashion" onClick={closeMenu}>
              Fashion
            </Link>
            <Link href="/food" onClick={closeMenu}>
              Food
            </Link>
            <Link href="/travel" onClick={closeMenu}>
              Travel
            </Link>
            <Link href="culture/" onClick={closeMenu}>
              Culture
            </Link>
            <Link href="/coding" onClick={closeMenu}>
              Coding
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
