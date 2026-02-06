import { useUser } from "../context/UserContext";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { userData, loading } = useUser();

  if (loading) return <p>Chargement des données...</p>;
  if (!userData) return <p>Impossible de récupérer les informations utilisateur.</p>;

  const { profile, statistics } = userData;
  const totalDistance = Number(statistics.totalDistance) || 0;
  const totalDuration = Number(statistics.totalDuration) || 0;

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        {/* Section 1 – Profil */}
        <section className={`${styles.section} ${styles.profileSection}`}>
          <div className={styles.profileCard}>
            <img
              src={profile.profilePicture || "/avatar.png"}
              alt="Profil"
              className={styles.photo}
            />
            <div className={styles.userInfo}>
              <h2 className={styles.name}>
                {profile.firstName} {profile.lastName}
              </h2>
              <p className={styles.memberSince}>
                Membre depuis {profile.createdAt}
              </p>
            </div>
          </div>

          <div className={styles.distanceWrapper}>
            <p className={styles.label}>Distance totale</p>
            <div className={styles.distanceCard}>
              <span className={styles.icon}>🏊‍♂️</span>
              <h2 className={styles.value}>{statistics.totalDistance} km</h2>
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

              <p className={styles.summary}>
                Total des kilomètres sur les 4 dernières semaines
              </p>

              <div className={styles.graph}>Graph barre</div>

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

              <p className={styles.summary}>Fréquence cardiaque moyenne</p>

              <div className={styles.graph}>Graph BPM</div>

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
            <div className={styles.donutCard}>
              <div className={styles.donutHeader}>
                <span className={styles.donutTitle}>Objectif de 6</span>
                <span className={styles.donutValue}>4</span>
              </div>
              <p className={styles.donutLabel}>Courses hebdomadaires réalisées</p>
              <div className={styles.donut}>🍩</div>
            </div>

            <div className={styles.details}>
              <div className={styles.detailCard}>
                <p className={styles.detailTitleBlue}>Durée activité</p>
                <p className={styles.detailValue}>{statistics.totalDuration} min</p>
              </div>
              <div className={styles.detailCard}>
                <p className={styles.detailTitleBlue}>Distance</p>
                <p className={styles.detailValueRed}>{statistics.totalDistance} km</p>
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
