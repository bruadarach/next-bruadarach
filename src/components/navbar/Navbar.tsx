import styles from "./navbar.module.css";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import SocialAccount from "../socialAccount/SocialAccount";
import Logo from "../logo/Logo";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <SocialAccount />
        <ThemeToggle />
      </div>
      <div className={styles.logo}>
        <Logo title={"BRUADARACH."} />
      </div>
      <div className={styles.links}>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
