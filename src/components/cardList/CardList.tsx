import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Post } from "../../../prisma/schemaTypes";
import { POST } from "@/app/api/auth/[...nextauth]/route";

interface CardListProps {
  page: number;
  cat?: string | undefined;
}

const getData = async (page: number, cat?: string | undefined) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
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

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <SectionTitle title="Latest Posts" />
      <div className={styles.posts}>
        {posts.map((post: Post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
