import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>SportSee</div>
      <nav className={styles.menu}>
        <Link to="/" className={styles.link}>Dashboard</Link>
        <Link to="/profile" className={styles.link}>Mon profil</Link>
        <button className={styles.link}>Déconnexion</button>
      </nav>
    </div>
  );
};

export default Sidebar;
