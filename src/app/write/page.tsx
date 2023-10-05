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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

interface FileData {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

const Write = () => {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [catSlug, setCatSlug] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<FileData | null>(null);
  const [media, setMedia] = useState<FileData | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const uniqueName = new Date().getTime() + "-" + file?.name;
      const storageRef = ref(storage, uniqueName);
      const uploadTask = uploadBytesResumable(storageRef, file as File);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL as any);
          });
        }
      );
    };
    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const imageFile = e.target.files[0];
      setFile(imageFile);
    }
  };

  const slugify = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    try {
      const data = await res.json();
      console.log(data, "data");
      router.push(`/posts/${data.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.publishButton} onClick={() => handleSubmit()}>
        Publish
      </button>
      <div className={styles.customSelect}>
        <select
          className={styles.select}
          onChange={(e) => setCatSlug(e.target.value)}
        >
          <option value="style">style</option>
          <option value="fashion">fashion</option>
          <option value="food">food</option>
          <option value="culture">culture</option>
          <option value="travel">travel</option>
          <option value="coding">coding</option>
        </select>
        <div className={styles.selectArrow}></div>
      </div>

      <input
        type="text"
        placeholder="Title"
        className="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.editor}>
        {/* <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="plus" width={20} height={20} priority />
        </button> */}
        {/* {open && ( */}
        <div className={styles.add}>
          <input
            type="file"
            id="image"
            onChange={(e) => handleChange(e)}
            style={{ display: "none" }}
          />
          <button className={styles.addButton}>
            <label htmlFor="image">
              <Image
                src="/image.png"
                alt="plus"
                width={16}
                height={16}
                priority
              />
            </label>
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
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Write your story..."
        />
      </div>
    </div>
  );
};

export default Write;
