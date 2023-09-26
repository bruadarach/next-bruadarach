import React from "react";
import styles from "./side.module.css";
import SectionTitle from "../sectionTitle/SectionTitle";
import SidePost from "../sidePost/SidePost";

const Side = () => {
  return (
    <div className={styles.container}>
      <div>
        <SectionTitle title={"Most Popular"} />
        <SidePost />
      </div>
      <div>
        <SectionTitle title={"Editor's Picks"} />
        <SidePost />
      </div>
    </div>
  );
};

export default Side;
