import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import SectionTitle from "../sectionTitle/SectionTitle";

const CardList = () => {
  return (
    <div className={styles.container}>
      <SectionTitle title="Latest Posts" />
      <div className={styles.posts}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;
