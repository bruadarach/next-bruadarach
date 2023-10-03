import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Category } from "../../../prisma/schemaTypes";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
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

const CategoryList = async () => {
  const data = await getData();

  return (
    <div className={styles.container}>
      <SectionTitle title="Categories" />
      <div className={styles.categories}>
        {data?.map((item: Category) => (
          <Link
            key={item._id}
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
          >
            <Image
              src={item.img as string}
              alt={item.title}
              width={32}
              height={32}
              className={styles.image}
            />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
