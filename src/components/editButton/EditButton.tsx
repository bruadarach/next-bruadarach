"use client";

import styles from "./editButton.module.css";
import { useRouter } from "next/navigation";

const EditButton = ({ slug }: { slug: string }) => {
  const router = useRouter();
  return (
    <button
      className={styles.button}
      onClick={() => {
        router.push(`/edit/${slug}`);
      }}
    >
      edit
    </button>
  );
};

export default EditButton;
