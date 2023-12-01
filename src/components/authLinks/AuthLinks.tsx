"use client";

import { useEffect, useState } from "react";
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

  const openMenu = () => {
    document.body.style.overflowY = "hidden";
    setOpen(true);
  };

  const closeMenu = () => {
    document.body.style.overflowY = "auto";
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.desktop}>
        {status === "unauthenticated" ? (
          <div className={styles.links}>
            <Link href="/" className={styles.link} onClick={closeMenu}>
              Home
            </Link>
            <Link href="/login" className={styles.link} onClick={closeMenu}>
              Login
            </Link>
          </div>
        ) : (
          <div className={styles.links}>
            <Link href="/" className={styles.link} onClick={closeMenu}>
              Home
            </Link>
            <Link href="/write" className={styles.link} onClick={closeMenu}>
              Write
            </Link>
            <span className={styles.link} onClick={() => signOut()}>
              Logout
            </span>
          </div>
        )}
      </div>
      <div className={styles.mobile}>
        <div className={styles.burger} onClick={openMenu}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        {open && (
          <div className={styles.responsiveMenus}>
            <div
              className={styles.icon}
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
              }}
            >
              <AiFillCloseSquare />
            </div>
            <div className={styles.responsiveMenuWrapper}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  closeMenu();
                }}
              >
                <Logo title={"Home"} />
              </div>
              {status === "unauthenticated" ? (
                <Link
                  href="/login"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    href="/write"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    Write
                  </Link>
                  <Link
                    href="/"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                  >
                    Logout
                  </Link>
                </>
              )}
              <div className={styles.borderLine}></div>
              {categories?.map((cat: Category) => (
                <Link
                  href={`/blog?cat=${cat.slug}`}
                  key={cat.slug}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
                >
                  {cat.slug}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLinks;
