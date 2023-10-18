"use client";

import React, { useState, useEffect } from "react";
import styles from "./edit.module.css";
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
import useSWR from "swr";
import DOMPurify from "dompurify";

interface FileData {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

// const getData = async (slug: string) => {
//   try {
//     const res = await fetch(
//       `https://next-bruadarach.vercel.app/api/posts/${slug}`,
//       {
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       console.error("Fetch error:", res.status, res.statusText);
//       throw new Error("Failed");
//     }
//     return res.json();
//   } catch (error) {
//     console.error("getData error:", error);
//     throw error;
//   }
// };

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

interface EditProps {
  params: {
    slug: string;
  };
}

const Edit = ({ params }: EditProps) => {
  const { slug } = params;
  const { status, data: sessionData } = useSession();
  const router = useRouter();
  const [catSlug, setCatSlug] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  // const [editedDesc, setEditedDesc] = useState<null | string>(null);
  const [file, setFile] = useState<FileData | null>(null);
  const [media, setMedia] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { data, mutate, isLoading } = useSWR(
    `https://next-bruadarach.vercel.app/api/posts/${slug}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setValue(data.desc);
      setCatSlug(data.catSlug);
      setMedia(data.img);
    }

    if (!isLoading) {
      if (status === "unauthenticated") {
        router.push("/login");
      } else if (sessionData?.user?.email !== data?.user.email) {
        alert("You are not the author of this post");
        router.push("/");
      }
    }
  }, [data, isLoading, status, sessionData, router]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (status === "unauthenticated") {
  //       router.push("/login");
  //     } else if (sessionData?.user?.email !== data?.user.email) {
  //       alert("You are not the author of this post");
  //       router.push("/");
  //     }
  //   }
  // }, [isLoading, status, sessionData, data, router]);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     if (status === "unauthenticated") {
  //       await router.push("/login");
  //       return; // 이후 코드 실행을 막고(Edit페이지 로드 안하고) 바로 로그인화면으로 이동시키기 위해 return 사용
  //     }

  //     if (sessionData?.user?.email !== post.user.email) {
  //       alert("You are not the author of this post");
  //       await router.push("/");
  //       return; // 이후 코드 실행을 막고(Edit페이지 로드 안하고) 바로 홈화면으로 이동시키기 위해 return 사용
  //     }

  //     // 나머지 코드 실행
  //     setTitle(post.title);
  //     setValue(post.desc);
  //     setCatSlug(post.catSlug);
  //     setMedia(post.img);
  //   };

  //   if (status === "loading") {
  //     // 세션 데이터가 아직 로드되지 않았을 때 기다림
  //     return;
  //   }

  //   checkSession();
  // }, [params, status, sessionData, router]);

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
    return (
      <div>
        <Loading />
      </div>
    );
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

  // const handleSubmit = async () => {
  //   const res = await fetch(`/api/posts/${params.slug}`, {
  //     cache: "no-store",
  //     method: "PUT",
  //     body: JSON.stringify({
  //       title: title,
  //       desc: value,
  //       img: media,
  //       slug: slugify(title),
  //       catSlug: catSlug,
  //     }),
  //   });

  //   try {
  //     const data = await res.json();
  //     router.push(`/posts/${data.slug}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSave = async () => {
    const sanitizedHtml = DOMPurify.sanitize(value);

    try {
      const res = await fetch(`/api/posts/${params.slug}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          desc: sanitizedHtml, // 사용자 입력이 아닌, 정제된 HTML를 사용해야 합니다.
          img: media,
          slug: slugify(title),
          catSlug: catSlug || "style",
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
        // 성공적으로 업데이트 후 mutate 호출
        mutate();
      } else {
        // 에러 처리
        console.error("Failed to update post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button className={styles.editButton} onClick={() => handleSave()}>
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
                  priority
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

export default Edit;
