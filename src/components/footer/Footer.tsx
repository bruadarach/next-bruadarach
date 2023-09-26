import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import SocialAccount from "../socialAccount/SocialAccount";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="logo"
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
            priority
          />
          <h1 className={styles.logoText}>Bruadarach</h1>
        </div>
        <p>
          This blog is crafted using Next.js and seamlessly connected to
          MongoDB. Enjoy the convenience of CRUD operations for posts. Explore
          my social accounts and do not hesitate to get in touch for inquiries,
          job opportunities, or just a friendly chat.
        </p>
        <div className={styles.icons}>
          <SocialAccount />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Contact</span>
          <Link href="/">Email</Link>
          <Link href="/">CV</Link>
          <Link href="/">Blog</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Github</Link>
          <Link href="/">Linkedin</Link>
          <Link href="/">Notion</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
