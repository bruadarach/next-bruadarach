import React from "react";
import styles from "./sidePost.module.css";
import Link from "next/link";
import Image from "next/image";
import { Post } from "../../../prisma/schemaTypes";

const SidePost = ({ post }: { post: Post }) => {
  return (
    <div key={post._id} className={styles.items}>
      <Link href={`/posts/${post.slug}`} className={styles.item}>
        {post.img && (
          <div className={styles.imageContainer}>
            <Image
              src={post.img}
              alt="thumbnail"
              fill
              sizes="100%"
              className={styles.image}
              priority
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles[post.catSlug]}`}>
            {post.catSlug}
          </span>
          <h3 className={styles.postTitle}>{post.title}</h3>
          <div className={styles.detail}>
            <span className={styles.username}>{post.user.name}</span>
            <span className={styles.date}>
              - {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SidePost;
