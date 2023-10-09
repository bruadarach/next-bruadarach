"use client";

import React from "react";
import styles from "./sessionButtons.module.css";
import EditButton from "@/components/editButton/EditButton";
import DeleteButton from "@/components/deleteButton/DeleteButton";
import { useSession } from "next-auth/react";

const SessionButtons = ({
  slug,
  userEmail,
}: {
  slug: string;
  userEmail: string;
}) => {
  const { status, data: sessionData } = useSession();

  return (
    <>
      {status === "authenticated" && sessionData?.user?.email === userEmail && (
        <div className={styles.buttons}>
          <EditButton slug={slug} />
          <DeleteButton slug={slug} />
        </div>
      )}
    </>
  );
};

export default SessionButtons;
