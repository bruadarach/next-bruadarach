import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const Featured = () => {
  return (
    <div className="styles.container">
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src="/p1.jpeg"
            alt="featured"
            fill
            sizes="100%"
            className={styles.image}
            priority
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>New features in Next.js 13</h1>
          <p className={`${styles.postDesc} ${roboto.className}`}>
            Next.js 13 introduces a powerful new Image component, allowing you
            to easily display images without layout shift and optimize files
            on-demand for increased performance.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
