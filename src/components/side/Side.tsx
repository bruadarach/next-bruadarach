import React from "react";
import styles from "./side.module.css";
import Link from "next/link";
import SectionTitle from "../sectionTitle/SectionTitle";
import SidePost from "../sidePost/SidePost";
import { Post } from "../../../prisma/schemaTypes";
import { Category } from "../../../prisma/schemaTypes";

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

const getSelectedPosts = async () => {
  try {
    const res = await fetch(
      `https://next-bruadarach.vercel.app/api/posts?selected=true`,
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

const getCategories = async () => {
  try {
    const res = await fetch(
      "https://next-bruadarach.vercel.app/api/categories",
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
  const { posts: selectedPosts } = await getSelectedPosts();
  const categories = await getCategories();

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
      <div>
        <SectionTitle title={"Categories"} />
        <div className={styles.categories}>
          {categories &&
            categories.map((category: Category) => (
              <Link href={`/blog?cat=${category.slug}`} key={category._id}>
                <div className={`${styles.category} ${styles[category.slug]}`}>
                  {category.title}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Side;
