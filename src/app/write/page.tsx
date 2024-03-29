"use client";

import { useState, useEffect } from "react";
import styles from "./write.module.css";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import Loading from "@/components/loading/Loading";
// import DOMPurify from "dompurify";

interface FileData {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

const Write = () => {
  const { status } = useSession();
  const router = useRouter();
  const [catSlug, setCatSlug] = useState("news");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<FileData | null>(null);
  const [media, setMedia] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  // useEffect(() => {
  //   const sanitizedHtml = DOMPurify.sanitize(value);
  // }, [value]);

  useEffect(() => {
    if (file) {
      setLoading(true);

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
            setLoading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL as any);
              setLoading(false);
            });
          }
        );
      };
      file && upload();
    }
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
    // const sanitizedHtml = DOMPurify.sanitize(value);

    if (title === "" || value === "" || media === null) {
      alert("Please fill all required fields.");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        // desc: sanitizedHtml,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug,
      }),
    });

    try {
      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      } else if (res.status === 400) {
        const errorData = await res.json();
        if (errorData.message === "Duplicate title") {
          alert("Duplicate title. Please try another title.");
        } else {
          console.error("Unknown error:", errorData);
        }
      } else {
        console.error("Unhandled response:", res.status);
      }
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
          <option value="news">news</option>
          <option value="event">event</option>
          <option value="travel">travel</option>
          <option value="life">life</option>
          <option value="culture">culture</option>
          <option value="food">food</option>
        </select>
        <div className={styles.selectArrow}></div>
      </div>
      <input
        type="text"
        placeholder="Title"
        className="title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className={styles.editor}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Write your story..."
        />
      </div>
      <div className={styles.thumbnail}>
        <div className={styles.addThumbnail}>
          <h3>Add Thumbnail ▹ </h3>
          <input
            type="file"
            id="image"
            onChange={(e) => handleChange(e)}
            style={{ display: "none" }}
            accept="image/*"
            required
          />
          <button className={styles.addButton}>
            <label htmlFor="image">
              <Image src="/image.png" alt="plus" width={16} height={16} />
            </label>
          </button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.preview}>
            {media && (
              <div className={styles.imageContainer}>
                <Image
                  src={media}
                  alt="thumbnail"
                  fill
                  sizes="100%"
                  className={styles.image}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Write;
