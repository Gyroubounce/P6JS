import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/icons/logo.png";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // supprime token + userId
    navigate("/");      // redirige vers login
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}> 
        <div className={styles.graphIcon}> 
          <span className={styles.bar}></span> 
          <span className={styles.bar}></span> 
          <span className={styles.bar}></span> 
          <span className={styles.bar}></span> 
          <span className={styles.bar}></span> 
        </div> 
        <div className={styles.logo}>
          <img src={logo} alt="SportSee logo" />
        </div>
      </div>
      <nav className={styles.menu}>
        <Link to="/dashboard" className={styles.link}>Dashboard</Link>
        <Link to="/profile" className={styles.link}>Mon profil</Link>

        {/* Séparateur */}
        <div className={styles.separator}></div>

        <button onClick={handleLogout} className={styles.logout}>
          Se déconnecter
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
