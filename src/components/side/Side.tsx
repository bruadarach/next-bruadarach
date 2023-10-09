import React from "react";
import styles from "./side.module.css";
import SectionTitle from "../sectionTitle/SectionTitle";
import SidePost from "../sidePost/SidePost";
import { Post } from "../../../prisma/schemaTypes";

const getPopularData = async () => {
  try {
    const res = await fetch(
      `https://next-bruadarach.vercel.app/api/posts?popular=true`,
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

const getSelectedPosts = async (postSlugs: string[]) => {
  try {
    const query = postSlugs.map((slug) => `postSlug=${slug}`).join("&");
    const res = await fetch(
      `https://next-bruadarach.vercel.app/api/posts?${query}`,
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

const Side = async () => {
  const { posts: popularPosts } = await getPopularData();
  const postSlugs = [
    "why",
    "hi",
    "lets-write-one-more-time",
    "1",
    "not-too-long-limit",
  ];
  const { posts: selectedPosts } = await getSelectedPosts(postSlugs);

  return (
    <div className={styles.container}>
      <div>
        <SectionTitle title={"Most Popular"} />
        {popularPosts &&
          popularPosts.map((post: Post, index: number) => (
            <SidePost post={post} key={index} />
          ))}
      </div>
      <div>
        <SectionTitle title={"Editor's Picks"} />
        {selectedPosts &&
          selectedPosts.map((post: Post) => (
            <SidePost post={post} key={post._id} />
          ))}
      </div>
    </div>
  );
};

export default Side;
