import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import styles from "./Profile.module.css";
import '../../index.css';


import { transformUserData } from "../../utils/transformUserData";
import { formatDateTimeFR } from "../../utils/dateUtils";


const Profile = () => {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!token) return;

  const fetchAll = async () => {
    try {
      // 1) Infos utilisateur
      const userRes = await fetch("http://localhost:8000/api/user-info", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await userRes.json();


      // 2) Sessions complètes (toutes les dates jusqu'à aujourd'hui)
      const runRes = await fetch(
        "http://localhost:8000/api/user-activity?startWeek=1900-01-01&endWeek=2100-01-01",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const sessions = await runRes.json();

      // 3) Fusionner et transformer
      const transformed = transformUserData(user, sessions);

      setUserData(transformed);

    } catch (err) {
      console.error("Erreur fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
}, [token]);



  if (!token) return <p>Veuillez vous connecter pour accéder au profil.</p>;
  if (loading) return <p>Chargement des données...</p>;
  if (!userData) return <p>Impossible de récupérer les informations utilisateur.</p>;

  const { profile, statistics } = userData;

  
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        {/* Partie gauche – Photo et profil détaillé */}
        <div className={styles.left}>
      <div className={styles.cardHorizontal}>
        <div className={styles.photo}>
          <img
            src={profile.profilePicture || "/avatar.png"}
            alt="Profil"          
          />
        </div>
        <div className={styles.infoBlock}>
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p className={styles.memberSince}>Membre depuis {formatDateTimeFR(profile.createdAt)}</p>
        </div>
      </div>

          {/* Carte Profil détaillé */}
          <div className={styles.card}>
            <h3>Votre profil</h3>
            <div className={styles.separator}></div>
            <p>Âge : {profile.age} ans</p>
            <p>Genre : {profile.gender || "Non précisé"}</p>
            <p>Taille : {profile.height} cm</p>
            <p>Poids : {profile.weight} kg</p>
          </div>
        </div>

      <div className={styles.right}>
  
        {/* Intro */}
        <div className={styles.statsIntro}>
          <h3>Vos statistiques</h3>
          <p>depuis le {formatDateTimeFR(profile.createdAt)}</p>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.statCard}>
            <h4>Temps total couru</h4>
            <p className={styles.statValue}>
              {statistics.totalDuration.hours} h
              
            {" "}  
              <span className={styles.unit}>{statistics.totalDuration.minutes}</span>
              <span className={styles.unit}> min</span>
            </p>

          </div>

          <div className={styles.statCard}>
            <h4>Distance totale parcourue</h4>
            <p className={styles.statValue}>
              {statistics.totalDistance}
              <span className={styles.unit}> km</span>
            </p>
          </div>

          <div className={styles.statCard}>
            <h4>Nombre de sessions</h4>
            <p className={styles.statValue}>
              {statistics.totalSessions}
              <span className={styles.unit}> sessions</span>
            </p>
          </div>

          <div className={styles.statCard}>
            <h4>Calories brûlées</h4>
            <p className={styles.statValue}>
              {statistics.totalCalories || "—"}
              <span className={styles.unit}> cal</span>
            </p>
          </div>

          <div className={styles.statCard}>
            <h4>Jours de repos</h4>
            <p className={styles.statValue}>
              {statistics.restDays || "—"}
              <span className={styles.unit}> jours</span>
            </p>
          </div>
        </div>


      </div>

      </div>
      <Footer />
    </div>
  );
};

export default Profile;
