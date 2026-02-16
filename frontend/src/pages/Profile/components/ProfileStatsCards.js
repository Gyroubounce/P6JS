import styles from "../Profile.module.css";
import ProfileStatCard from "./ProfileStatCard";

const ProfileStatsCards = ({ statistics }) => {
  return (
    <div className={styles.cardsGrid}>

      <ProfileStatCard
        title="Temps total couru"
        value={`${statistics.totalDuration.hours} h`}
        unit={`${statistics.totalDuration.minutes} min`}
      />

      <ProfileStatCard
        title="Distance totale parcourue"
        value={statistics.totalDistance}
        unit="km"
      />

      <ProfileStatCard
        title="Nombre de sessions"
        value={statistics.totalSessions}
        unit="sessions"
      />

      <ProfileStatCard
        title="Calories brûlées"
        value={statistics.totalCalories || "—"}
        unit="cal"
      />

      <ProfileStatCard
        title="Jours de repos"
        value={statistics.restDays || "—"}
        unit="jours"
      />

    </div>
  );
};

export default ProfileStatsCards;
