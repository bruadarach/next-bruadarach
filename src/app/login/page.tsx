"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import {
  AiFillGoogleCircle,
  AiFillGithub,
  AiFillFacebook,
} from "react-icons/ai";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data, status } = useSession();
  // console.log(data, status, "data", "status");
  const router = useRouter();

  const handleSignIn = (provider: string) => {
    signIn(provider);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.socialButton}
          onClick={() => handleSignIn("google")}
        >
          <div className={styles.icon}>
            <AiFillGoogleCircle />
          </div>
          <div>Sign in with Google</div>
        </div>
        <div className={styles.socialButton}>
          <div className={styles.icon}>
            <AiFillGithub />
          </div>
          <div>Sign in with Github</div>
        </div>
        <div className={styles.socialButton}>
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
