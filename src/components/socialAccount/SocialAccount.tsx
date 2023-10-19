import React from "react";
import styles from "./socialAccount.module.css";
import Link from "next/link";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { RxNotionLogo } from "react-icons/rx";

export const socialAccounts = [
  {
    name: "Github",
    href: "https://github.com/bruadarach",
    icon: <AiFillGithub size={32} style={{ cursor: "pointer" }} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sujeongji",
    icon: <AiFillLinkedin size={33} style={{ cursor: "pointer" }} />,
  },
  {
    name: "Notion",
    href: "https://sujeongji.notion.site/SUJEONG-JI-675d7a916010494ea8c38ff771aafedf?pvs=4",
    icon: <RxNotionLogo size={32} style={{ cursor: "pointer" }} />,
  },
];

const SocialAccount = () => {
  return (
    <>
      <div className={styles.social}>
        <ul>
          {socialAccounts.map((account, index) => (
            <li key={index}>
              <Link
                href={account.href}
                target="_blank"
                passHref
                rel="noopener noreferrer"
              >
                {account.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SocialAccount;
