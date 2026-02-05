import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.left}>
          {/* Carte Photo + Nom */}
          <div className={styles.card}>
            <img src="/avatar.png" alt="Profil" className={styles.photo} />
            <h2>Prénom Nom</h2>
            <p>Membre depuis 2022</p>
          </div>

          {/* Carte Profil détaillé */}
          <div className={styles.card}>
            <h3>Votre profil</h3>
            <p>Âge : 28 ans</p>
            <p>Genre : Femme</p>
            <p>Taille : 165 cm</p>
            <p>Poids : 60 kg</p>
          </div>
        </div>

        {/* Statistiques */}
        <div className={styles.right}>
          <div className={styles.statCard}>
            <p>Temps total couru</p>
            <h2>1200 min</h2>
          </div>
          <div className={styles.statCard}>
            <p>Distance totale parcourue</p>
            <h2>250 km</h2>
          </div>
          <div className={styles.statCard}>
            <p>Nombre de sessions</p>
            <h2>30</h2>
          </div>
            <div className={styles.statCard}>
              <p>Calories brûlées</p>
              <h2>25 000 cal</h2>
            </div>
            <div className={styles.statCard}>
              <p>Nombre de jours de repos</p>
              <h2>9 jours</h2>
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
