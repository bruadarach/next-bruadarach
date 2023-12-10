"use client";

import { useState } from "react";
import styles from "./comments.module.css";
import Image from "next/image";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { CommentProps } from "../../../prisma/schemaTypes";
import { useRouter } from "next/navigation";
import Loading from "../loading/Loading";

interface CommentsProps {
  postSlug: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Comments = ({ postSlug }: CommentsProps) => {
  const router = useRouter();
  const { status, data: sessionData } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `https://next-bruadarach.vercel.app/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const [desc, setDesc] = useState("");
  const [editedDesc, setEditedDesc] = useState<null | string>(null);
  const [selectedCommentID, setSelectedCommentID] = useState<null | string>(
    null
  );

  const handleSubmit = async () => {
    if (
      status === "unauthenticated" &&
      window.confirm(
        "You need to login to write a comment. \n Redirect to login page?"
      )
    ) {
      router.push("/login");
    }

    if (status === "authenticated" && !desc) {
      alert("Please write a comment");
      return;
    }

    await fetch("https://next-bruadarach.vercel.app/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ desc, postSlug }),
    });
    setDesc("");
    mutate();
  };

  const handleSave = async (commentId: string) => {
    await fetch(
      `https://next-bruadarach.vercel.app/api/comments/${commentId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc: editedDesc }),
      }
    );
    setSelectedCommentID(null);
    setEditedDesc(null);
    mutate();
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await fetch(
        `https://next-bruadarach.vercel.app/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      mutate();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitleWrapper}>
        <SectionTitle title="Comments" />
      </div>
      <div className={styles.write}>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          placeholder={
            status === "unauthenticated"
              ? "Login to write a comment"
              : "Write a comment"
          }
          className={styles.input}
        />
        <div className={styles.buttonWrapper}>
          <button onClick={handleSubmit} className={styles.button}>
            send
          </button>
        </div>
      </div>
      <div className={styles.comments}>
        {isLoading ? (
          <Loading />
        ) : (
          data?.map((comment: CommentProps, index: number) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.user}>
                <Image
                  src={comment.user.image ? comment.user.image : "/user.png"}
                  alt="user"
                  width={42}
                  height={42}
                  className={styles.userImage}
                />
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{comment.user.name}</span>
                  <span className={styles.date}>
                    {comment.updatedAt
                      ? new Date(comment.updatedAt).toLocaleString()
                      : new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              {selectedCommentID === comment.id ? (
                <div className={styles.write}>
                  <textarea
                    onChange={(e) => setEditedDesc(e.target.value)}
                    value={editedDesc || comment.desc}
                    className={styles.input}
                  />
                  <div className={styles.buttonsForEdit}>
                    <button
                      onClick={() => handleSave(comment.id)}
                      className={styles.button}
                    >
                      save
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCommentID(null);
                        setEditedDesc(null);
                      }}
                      className={styles.button}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className={styles.desc}>{comment.desc}</p>
              )}
              {selectedCommentID !== comment.id &&
                sessionData?.user?.email === comment.user.email && (
                  <div className={styles.buttons}>
                    <button onClick={() => setSelectedCommentID(comment.id)}>
                      edit
                    </button>
                    <button onClick={() => handleDelete(comment.id)}>
                      delete
                    </button>
                  </div>
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
