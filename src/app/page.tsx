import Featured from "@/components/featured/Featured";
import styles from "./page.module.css";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Side from "@/components/side/Side";

export default function Home() {
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList />
        <Side />
      </div>
    </div>
  );
}
