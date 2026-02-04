import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "./Dashboard.module.css";


const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        {/* Section 1 */}
        <div className={styles.section}>
          <div className={styles.profileCard}>
            <img src="/avatar.png" alt="Profil" className={styles.photo} />
            <div>
              <h2>Prénom Nom</h2>
              <p>Membre depuis 2022</p>
            </div>
          </div>
          <div className={styles.distanceCard}>
            <div className={styles.icon}>🏆</div>
            <div>
              <p>Distance totale</p>
              <h2>120 km</h2>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <h3>Vos dernières performances</h3>
          <div className={styles.graphs}>
            <div className={styles.graph}>Graph km/semaine</div>
            <div className={styles.graph}>Graph BPM/jour</div>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <h3>Cette semaine du 01/02 au 07/02</h3>
          <div className={styles.weekStats}>
            <div className={styles.circle}>Course hebdo</div>
            <div className={styles.details}>
              <div className={styles.detailCard}>Durée activité: 120 min</div>
              <div className={styles.detailCard}>Distance: 25 km</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};



export default Dashboard;
