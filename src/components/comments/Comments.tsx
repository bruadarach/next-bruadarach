import React from "react";
import styles from "./comments.module.css";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/sectionTitle/SectionTitle";

const Comments = () => {
  const status = "authenticated";

  return (
    <div className={styles.container}>
      <SectionTitle title="Comments" />
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea placeholder="Write a comment" className={styles.input} />
          <button className={styles.button}>send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment </Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/logo.png"
              alt="user"
              width={42}
              height={42}
              priority
              className={styles.userImage}
            />
            <div className={styles.userInfo}>
              <span className={styles.userName}>Deoqua</span>
              <span className={styles.date}>2023.11.11</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque earum
            voluptatem praesentium expedita deleniti eaque, ut vitae, iusto
            velit assumenda aut culpa sint eligendi delectus. Consectetur
            voluptates sed nulla sequi.
          </p>
        </div>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/logo.png"
              alt="user"
              width={42}
              height={42}
              priority
              className={styles.userImage}
            />
            <div className={styles.userInfo}>
              <span className={styles.userName}>Deoqua</span>
              <span className={styles.date}>2023.11.11</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque earum
            voluptatem praesentium expedita deleniti eaque, ut vitae, iusto
            velit assumenda aut culpa sint eligendi delectus. Consectetur
            voluptates sed nulla sequi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
