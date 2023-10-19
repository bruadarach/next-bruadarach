import styles from "./blogPage.module.css";
import CardList from "@/components/cardList/CardList";
import Side from "@/components/side/Side";
import Image from "next/image";

interface Props {
  searchParams: {
    page: string;
    cat: string;
  };
}

const BlogPage = ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.sectionTitle}>
          <h1>{cat}</h1>
          <div className={styles.imageContainer}>
            <Image
              src="/blog.png"
              alt="thumbnail"
              fill
              sizes="100%"
              priority
              className={styles.image}
            />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Side />
      </div>
    </div>
  );
};

export default BlogPage;
