"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination = ({ page, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter();

  const goToPage = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => goToPage(page - 1)}
        disabled={!hasPrev}
      >
        ◀ Previous
      </button>
      <button
        className={styles.button}
        onClick={() => goToPage(page + 1)}
        disabled={!hasNext}
      >
        Next ►
      </button>
    </div>
  );
};

export default Pagination;
