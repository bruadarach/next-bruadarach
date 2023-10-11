"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  cat?: string | undefined;
}

const Pagination = ({ page, cat, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() =>
          cat
            ? router.push(`?cat=${cat}&page=${page - 1}`)
            : router.push(`?page=${page - 1}`)
        }
        disabled={!hasPrev}
      >
        ◀ Previous
      </button>
      <button
        className={styles.button}
        onClick={() =>
          cat
            ? router.push(`?cat=${cat}&page=${page + 1}`)
            : router.push(`?page=${page + 1}`)
        }
        disabled={!hasNext}
      >
        Next ►
      </button>
    </div>
  );
};

export default Pagination;
