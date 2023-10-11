import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Post } from "../../../prisma/schemaTypes";

interface CardListProps {
  page: number;
  cat?: string | undefined;
}

const getData = async (page: number, cat?: string | undefined) => {
  try {
    const res = await fetch(
      `https://next-bruadarach.vercel.app/api/posts?cat=${
        cat || ""
      }&page=${page}`,
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

const CardList = async ({ page, cat }: CardListProps) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 4;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <SectionTitle title="Latest Posts" />
      <div className={styles.posts}>
        {posts?.length ? (
          posts.map((post: Post) => <Card key={post._id} post={post} />)
        ) : (
          <div className={styles.empty}>
            <p>No published posts available at the moment.</p>
          </div>
        )}
      </div>
      <Pagination page={page} cat={cat} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
