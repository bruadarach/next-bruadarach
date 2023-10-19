import styles from "./loading.module.css";
import spinner from "../../../public/spinner.svg";
import Image from "next/image";

const Loading = () => {
  return (
    <div className={styles.container}>
      <Image
        src={spinner}
        alt="Loading"
        className={styles.spinner}
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default Loading;
