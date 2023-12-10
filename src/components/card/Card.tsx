import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../../prisma/schemaTypes";

const Card = ({ post }: { post: Post }) => {
  return (
    <div className={styles.container}>
      {post?.img && (
        <div className={styles.imageContainer}>
          <Image
            src={post?.img}
            alt="featured"
            fill
            sizes="100%"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={`${styles.category} ${styles[post.catSlug]}`}>
            {post.catSlug}
          </span>
          <span className={styles.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <Link prefetch={false} href={`/posts/${post.slug}`}>
          <h1 className={styles.title}>{post.title}</h1>
        </Link>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: post.desc }}
        />
        <Link
          prefetch={false}
          href={`/posts/${post.slug}`}
          className={styles.link}
        >
          Read More ➚
        </Link>
      </div>
    </div>
  );
};

export default Card;
