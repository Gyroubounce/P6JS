import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>SportSee</div>
      <div className={styles.right}>Tous droits réservés</div>
    </footer>
  );
};

export default Footer;
