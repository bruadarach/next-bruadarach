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
            {new Date(post.createdAt).toLocaleDateString()} -{" "}
          </span>
          <span className={styles.category}>{post.catSlug}</span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: post.desc }}
        />
        <Link href={`/posts/${post.slug}`} className={styles.link}>
          Read More ➚
        </Link>
      </div>
    </div>
  );
};

export default Card;
