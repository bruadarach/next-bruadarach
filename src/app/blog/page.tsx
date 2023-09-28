import React from "react";
import styles from "./blogPage.module.css";
import CardList from "@/components/cardList/CardList";
import Side from "@/components/side/Side";
import Image from "next/image";

const BlogPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <h1>Style</h1>
        <div className={styles.imageContainer}>
          <Image
            src="/blog.png"
            alt="thumbnail"
            fill
            sizes="100%"
            priority
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <CardList />
        <Side />
      </div>
    </div>
  );
};

export default BlogPage;
