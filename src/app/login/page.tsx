"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import {
  AiFillGoogleCircle,
  AiFillGithub,
  AiFillFacebook,
} from "react-icons/ai";

const LoginPage = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.socialButton}
          onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
        >
          <div className={styles.icon}>
            <AiFillGoogleCircle />
          </div>
          <div>Sign in with Google</div>
        </div>
        <div
          className={styles.socialButton}
          onClick={() => signIn("github", { redirect: true, callbackUrl: "/" })}
        >
          <div className={styles.icon}>
            <AiFillGithub />
          </div>
          <div>Sign in with Github</div>
        </div>
        <div
          className={styles.socialButton}
          onClick={() =>
            signIn("facebook", { redirect: true, callbackUrl: "/" })
          }
        >
          <div className={styles.icon}>
            <AiFillFacebook />
          </div>
          <div>Sign in with Facebook</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
