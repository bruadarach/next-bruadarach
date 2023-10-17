"use client";

import React, { useState, useEffect } from "react";
import styles from "./edit.module.css";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
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

interface FileData {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

const getData = async (slug: string) => {
  try {
    const res = await fetch(
      `https://next-bruadarach.vercel.app/api/posts/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Fetch error:", res.status, res.statusText);
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    console.error("getData error:", error);
    throw error;
  }
};

const Edit = ({ params }: { params: { slug: string } }) => {
  const { status, data: sessionData } = useSession();
  const router = useRouter();
  const [catSlug, setCatSlug] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<FileData | null>(null);
  const [media, setMedia] = useState<string | null>(null);
  const [user, setUser] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { slug } = params;
    const getPost = async () => {
      const post = await getData(slug);
      setTitle(post.title);
      setValue(post.desc);
      setCatSlug(post.catSlug);
      setMedia(post.img);
      setUser(post.user.email);
    };
    getPost();
  }, [params]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (sessionData?.user?.email !== user) {
      alert("You are not the author of this post");
      router.push("/");
    }
  }, [router, status, sessionData, user]);

  useEffect(() => {
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
  }, [file]);

  if (status === "loading") {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  console.log(user, "user");
  console.log(sessionData?.user?.email, "sessionData?.user?.email");

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
    const res = await fetch(`/api/posts/${params.slug}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      }),
    });

    try {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button className={styles.editButton} onClick={() => handleSubmit()}>
          Edit
        </button>
        <button
          className={styles.cancelButton}
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>
      </div>
      <div className={styles.customSelect}>
        <select
          value={catSlug}
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
        value={title}
        placeholder="Title"
        className="title"
        onChange={(e) => setTitle(e.target.value)}
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
        </div>
        <div className={styles.preview}>
          {media && (
            <div className={styles.imageContainer}>
              <Image
                src={media}
                alt="thumbnail"
                fill
                sizes="100%"
                priority
                className={styles.image}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
