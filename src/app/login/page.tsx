import React from "react";
import styles from "./loginPage.module.css";
import {
  AiFillGoogleCircle,
  AiFillGithub,
  AiFillFacebook,
} from "react-icons/ai";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton}>
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
