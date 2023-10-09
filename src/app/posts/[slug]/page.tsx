import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Side from "@/components/side/Side";
import Comments from "@/components/comments/Comments";
import dynamic from "next/dynamic";
const SessionButtons = dynamic(
  () => import("@/components/sessionButtons/SessionButtons"),
  { ssr: false }
);

interface singlePageProps {
  params: {
    slug: string;
  };
}

const getData = async (slug: string) => {
  try {
    const res = await fetch(
      `https://next-bruadarach.vercel.app/api/posts/${slug}`,
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

const singlePage = async ({ params }: singlePageProps) => {
  const { slug } = params;
  const post = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={styles.sessionButtons}>
            <SessionButtons slug={slug} userEmail={post.user?.email} />
          </div>
          <div className={`${styles.category} ${styles[post.catSlug]}`}>
            {post.catSlug}
          </div>
          <h1>{post.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image
                src={post.user?.image ? post.user?.image : "/user.png"}
                alt="user"
                width={42}
                height={42}
                priority
                className={styles.userImage}
              />
            </div>
            <div className={styles.userName}>{post.user?.name}</div>
          </div>
          <div className={styles.date}>
            <div className={styles.publishedDate}>
              Published: {new Date(post.createdAt).toLocaleString()}
            </div>
            <div className={styles.divisor}>|</div>
            {post.updatedAt && (
              <div className={styles.updatedDate}>
                Updated: {new Date(post.updatedAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          {post?.img && (
            <div className={styles.articleImageContainer}>
              <Image
                src={post.img}
                alt="article"
                width={400}
                height={500}
                priority
                className={styles.articleImage}
                style={{ width: "100%" }}
              />
            </div>
          )}
          <div className={styles.desc}>
            <p dangerouslySetInnerHTML={{ __html: post.desc }} />
          </div>
          <div className={styles.comments}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <div className={styles.side}>
          <Side />
        </div>
      </div>
    </div>
  );
};

export default singlePage;
