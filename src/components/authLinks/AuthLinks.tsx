"use client";

import React, { useEffect, useState } from "react";
import styles from "./authLinks.module.css";
import Link from "next/link";
import { AiFillCloseSquare } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";

const getData = async () => {
  try {
    const res = await fetch(
      "https://next-bruadarach.vercel.app/api/categories",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Fetch error:", res.status, res.statusText);
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    console.error("getData error:", error);
    throw error;
  }
};

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const [categories, setCategories] = useState<string[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://next-bruadarach.vercel.app/api/categories",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          console.error("Fetch error:", res.status, res.statusText);
          throw new Error("Failed");
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("getData error:", error);
      }
    }
    fetchData();
  }, []);

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
            {categories?.map((cat: string) => (
              <Link href={`/blog?cat=${cat}`} key={cat} onClick={closeMenu}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
