import React from "react";
import styles from "./comments.module.css";
import Link from "next/link";
import SectionTitle from "@/components/sectionTitle/SectionTitle";

const Comments = () => {
  const status = "authenticated";

  return (
    <div className={styles.container}>
      <SectionTitle title="Comments" />
      {status === "authenticated" ? (
        <div className={styles.write}>
          write
          <textarea placeholder="write a comment" className={styles.input} />
          <button className={styles.button}>send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment </Link>
      )}
    </div>
  );
};

export default Comments;
