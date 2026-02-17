import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.logo}>© SportSee</span>
        <span className={styles.text}>Tous droits réservés</span>
      </div>
      <div className={styles.right}>
          <Link to="/conditions" className={styles.link}>Conditions générales</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
          <div className={styles.graphIcon}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
      </div>
    </footer>

  );
};

export default Footer;
