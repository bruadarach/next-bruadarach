"use client";

import React, { useEffect, useState } from "react";
import styles from "./authLinks.module.css";
import Link from "next/link";
import { AiFillCloseSquare } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { Category } from "../../../prisma/schemaTypes";
import Logo from "../logo/Logo";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const [categories, setCategories] = useState<Category[] | null>(null);

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
            <div onClick={closeMenu}>
              <Logo title={"Home"} />
            </div>
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
            {categories?.map((cat: Category) => (
              <Link
                href={`/blog?cat=${cat.slug}`}
                key={cat.slug}
                onClick={closeMenu}
              >
                {cat.slug}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
