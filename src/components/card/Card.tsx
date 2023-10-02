import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../../prisma/schemaTypes";

const Card = ({ post }: { post: Post }) => {
  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imageContainer}>
          <Image
            src={post.img}
            alt="thumbnail"
            fill
            sizes="100%"
            priority
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {new Date(post.createdAt).toISOString().split("T")[0]} -{" "}
          </span>
          <span className={styles.category}>{post.catSlug}</span>
        </div>
        <Link href="/">
          <h1>{post.title}</h1>
        </Link>
        <p className={styles.desc}>{post.desc}</p>
        <Link href="/" className={styles.link}>
          Read More ➚
        </Link>
      </div>
    </div>
  );
};

export default Card;
