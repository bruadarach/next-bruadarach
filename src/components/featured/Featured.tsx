import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const getData = async (slug: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: "no-store",
    });

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
  const post = await getData("remove-cache");

  return (
    <div className="styles.container">
      <div className={styles.post}>
        {post.img && (
          <div className={styles.imgContainer}>
            <Image
              src={post.img}
              alt="featured"
              fill
              sizes="100%"
              className={styles.image}
              priority
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <p
            className={styles.postDesc}
            dangerouslySetInnerHTML={{ __html: post.desc }}
          />
          {/* <button className={styles.button}>Read More</button> */}
          <Link href={`/posts/${post.slug}`} className={styles.link}>
            Read More ➚
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
