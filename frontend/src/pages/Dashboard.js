import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "./Dashboard.module.css";


const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
      
        {/* Section 1 – Profil */}
        <section className={`${styles.section} ${styles.profileSection}`}>
          <div className={styles.profileCard}>
            <img src="/avatar.png" alt="Profil" className={styles.photo} />
            <div className={styles.userInfo}>
              <h2 className={styles.name}>Prénom Nom</h2>
              <p className={styles.memberSince}>Membre depuis 2022</p>
            </div>
          </div>

          <div className={styles.distanceWrapper}>
            <p className={styles.label}>Distance totale</p>
            <div className={styles.distanceCard}>
              <span className={styles.icon}>🏊‍♂️</span>
              <h2 className={styles.value}>120 km</h2>
            </div>
          </div>
        </section>
        {/* Section 2 – Performances */}
        <section className={`${styles.section} ${styles.performanceSection}`}>
          <h3>Vos dernières performances</h3>
          <div className={styles.graphs}>
            <div className={styles.graphCard}>
              {/* Header */}
              <div className={styles.graphHeader}>
                <h4 className={styles.titleBlue}>Km en moyenne</h4>

                <div className={styles.periodSelector}>
                  <button>{"<"}</button>
                  <span>28 mai - 25 juin</span>
                  <button>{">"}</button>
                </div>
              </div>

              {/* Résumé */}
              <p className={styles.summary}>
                Total des kilomètres sur les 4 dernières semaines
              </p>

              {/* Graph */}
              <div className={styles.graph}>
                Graph barre
              </div>
              

              {/* Légende */}
              <div className={styles.legend}>
                <span className={styles.legendItem}>Semaine 1</span>
                <span className={styles.legendItem}>Semaine 2</span>
              </div>
            </div>

            <div className={styles.graphCard}>
              <div className={styles.graphHeader}>
                <h4 className={styles.titleRed}>Fréquence cardiaque</h4>

                <div className={styles.periodSelector}>
                  <button>{"<"}</button>
                  <span>28 mai - 04 juin</span>
                  <button>{">"}</button>
                </div>
              </div>

              <p className={styles.summary}>
                Fréquence cardiaque moyenne
              </p>

              <div className={styles.graph}>
                Graph BPM
              </div>

              <div className={styles.legend}>
                <span className={styles.legendItem}>Repos</span>
                <span className={styles.legendItem}>Effort</span>
              </div>
            </div>

          </div>
        </section>
        {/* Section 3 – Semaine */}
        <section className={`${styles.section} ${styles.weekSection}`}>
          <h3>Cette semaine du 01/02 au 07/02</h3>

          <div className={styles.weekStats}>
            {/* Donut - Course hebdomadaire */}
            <div className={styles.donutCard}>
              <div className={styles.donutHeader}>
                <span className={styles.donutTitle}>Objectif de 6</span>
                <span className={styles.donutValue}>4</span>
              </div>
              <p className={styles.donutLabel}>Courses hebdomadaires réalisées</p>
              <div className={styles.donut}>🍩</div> {/* remplacer par un vrai donut plus tard */}
            </div>

            {/* Détails de durée et distance */}
            <div className={styles.details}>
              <div className={styles.detailCard}>
                <p className={styles.detailTitleBlue}>Durée activité</p>
                <p className={styles.detailValue}>120 min</p>
              </div>
              <div className={styles.detailCard}>
                <p className={styles.detailTitleBlue}>Distance</p>
                <p className={styles.detailValueRed}>25 km</p>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    <Footer />
    </div>
    
  );
};



export default Dashboard;
