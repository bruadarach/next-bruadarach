import styles from "./sectionTitle.module.css";
import { BsBookmarkStarFill } from "react-icons/bs";

interface Props {
  title: string;
}

const sectionTitle = ({ title }: Props) => {
  return (
    <div className={styles.title}>
      <span className={styles.icon}>
        <BsBookmarkStarFill />
      </span>
      <h1>{title}</h1>
    </div>
  );
};

export default sectionTitle;
