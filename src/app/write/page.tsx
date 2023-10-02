"use client";

import React, { useState, useEffect } from "react";
import styles from "./write.module.css";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), {
//   ssr: false,
// });

const Write = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.publishButton}>Publish</button>
      <input type="text" placeholder="Title" className="title" />
      <div className={styles.editor}>
        {/* <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="plus" width={20} height={20} priority />
        </button> */}
        {/* {open && ( */}
        <div className={styles.add}>
          <button className={styles.addButton}>
            <Image
              src="/image.png"
              alt="plus"
              width={16}
              height={16}
              priority
            />
          </button>
          <button className={styles.addButton}>
            <Image
              src="/external.png"
              alt="plus"
              width={16}
              height={16}
              priority
            />
          </button>
          <button className={styles.addButton}>
            <Image
              src="/video.png"
              alt="plus"
              width={16}
              height={16}
              priority
            />
          </button>
        </div>
        {/* )} */}
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default Write;
