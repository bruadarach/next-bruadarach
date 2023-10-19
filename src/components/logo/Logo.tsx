"use client";

import styles from "./logo.module.css";
import { useRouter } from "next/navigation";

const Logo = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className={styles.container} onClick={() => router.push("/")}>
      {title}
    </div>
  );
};

export default Logo;
