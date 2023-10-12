import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch(
      `https://next-bruadarach.vercel.app/api/posts?featured=true`,
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

const Featured = async () => {
  const post = await getData();

  return (
    <div className="styles.container">
      <div className={styles.post}>
        {post?.img && (
          <div className={styles.imageContainer}>
            <Image
              src={post?.img}
              alt="featured"
              fill
              className={styles.image}
              priority
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <Link href={`/posts/${post?.slug}`}>
            <h2 className={styles.postTitle}>{post?.title}</h2>
          </Link>
          <p
            className={styles.postDesc}
            dangerouslySetInnerHTML={{ __html: post?.desc }}
          />
          <Link href={`/posts/${post?.slug}`} className={styles.link}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
