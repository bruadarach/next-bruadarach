import styles from "./categoryList.module.css";
import Link from "next/link";
import { Category } from "../../../prisma/schemaTypes";

const getData = async () => {
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

const CategoryList = async () => {
  const data = await getData();

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {data?.map((item: Category) => (
          <Link
            prefetch={false}
            key={item?._id}
            href={`/blog?cat=${item?.slug}`}
            className={`${styles.category} ${styles[item?.slug]}`}
          >
            {item?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
