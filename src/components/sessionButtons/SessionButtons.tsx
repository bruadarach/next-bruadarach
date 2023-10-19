"use client";

import styles from "./sessionButtons.module.css";
import EditButton from "@/components/editButton/EditButton";
import DeleteButton from "@/components/deleteButton/DeleteButton";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

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

export default dynamic(() => Promise.resolve(SessionButtons), { ssr: false });
