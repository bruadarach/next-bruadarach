import Featured from "@/components/featured/Featured";
import styles from "./page.module.css";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Side from "@/components/side/Side";

interface Props {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams }: Props) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} />
        <Side />
      </div>
    </div>
  );
}
