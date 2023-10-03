import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Side from "@/components/side/Side";
import Comments from "@/components/comments/Comments";

interface singlePageProps {
  params: {
    slug: string;
  };
}

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

const createMarkup = (htmlString: string) => {
  console.log(htmlString, "htmlString");
  return { __html: htmlString };
};

const singlePage = async ({ params }: singlePageProps) => {
  const { slug } = params;
  const post = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1>{post.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image
                src={post.user.image ? post.user.image : "/user.png"}
                alt="user"
                width={42}
                height={42}
                priority
                className={styles.userImage}
              />
            </div>
            <div className={styles.userName}>{post.user.name}</div>
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
                className={styles.articelImage}
                style={{ width: "100%" }}
              />
            </div>
          )}
          <div className={styles.desc}>
            <p dangerouslySetInnerHTML={{ __html: post.desc }} />
          </div>
          <div className={styles.comments}>
            <Comments />
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
