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
          This website is built with Next.js and MongoDB and offers
          functionalities such as OAuth authentication, CRUD operations, image
          upload, theme toggle, and responsive design. Feel free to explore my
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
          <Link prefetch={false} href="/">
            Homepage
          </Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Contact</span>
          <Link prefetch={false} href="mailto:suji.sujeongji@gmail.com">
            Email
          </Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          {socialAccounts.map((account, index) => (
            <li key={index}>
              <Link
                prefetch={false}
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
