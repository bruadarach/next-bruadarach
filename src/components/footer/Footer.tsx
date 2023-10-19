import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import SocialAccount from "../socialAccount/SocialAccount";
import { socialAccounts } from "../socialAccount/SocialAccount";

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
          This blog is built with Next.js and connected to MongoDB, offering the
          convenience of CRUD operations for posts and comments. Explore my
          social accounts and do not hesitate to get in touch for inquiries, job
          opportunities, or just a friendly chat.
        </p>
        <div className={styles.icons}>
          <SocialAccount />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Contact</span>
          <Link href="mailto:suji.sujeongji@gmail.com">Email</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          {socialAccounts.map((account, index) => (
            <li key={index}>
              <Link
                href={account.href}
                target="_blank"
                passHref
                rel="noopener noreferrer"
              >
                {account.name}
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
