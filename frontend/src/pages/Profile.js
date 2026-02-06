import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "./Profile.module.css";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Erreur fetch user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
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
          {/* Carte Photo + Nom */}
          <div className={styles.card}>
            <img
              src={profile.profilePicture || "/avatar.png"}
              alt="Profil"
              className={styles.photo}
            />
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p>Membre depuis {profile.createdAt}</p>
          </div>

          {/* Carte Profil détaillé */}
          <div className={styles.card}>
            <h3>Votre profil</h3>
            <p>Âge : {profile.age} ans</p>
            <p>Genre : {profile.gender || "Non précisé"}</p>
            <p>Taille : {profile.height} cm</p>
            <p>Poids : {profile.weight} kg</p>
          </div>
        </div>

        {/* Partie droite – Statistiques */}
        <div className={styles.right}>
          <div className={styles.statCard}>
            <p>Temps total couru</p>
            <h2>{statistics.totalDuration} min</h2>
          </div>
          <div className={styles.statCard}>
            <p>Distance totale parcourue</p>
            <h2>{statistics.totalDistance} km</h2>
          </div>
          <div className={styles.statCard}>
            <p>Nombre de sessions</p>
            <h2>{statistics.totalSessions}</h2>
          </div>
          <div className={styles.statCard}>
            <p>Calories brûlées</p>
            <h2>{statistics.totalCalories || "—"} cal</h2>
          </div>
          <div className={styles.statCard}>
            <p>Nombre de jours de repos</p>
            <h2>{statistics.restDays || "—"} jours</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
