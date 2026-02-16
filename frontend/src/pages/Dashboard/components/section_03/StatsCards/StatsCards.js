import StatCard from "../StatCard/StatCard";
import styles from "./StatsCards.module.css";

const StatsCards = ({ weeklyDuration, weeklyDistance }) => {
  return (
    <div className={styles.statsContainer}>
      <StatCard
        title="Durée d'activité"
        value={weeklyDuration}
        unit="minutes"
        variant="blue"
      />

      <StatCard
        title="Distance"
        value={weeklyDistance.toFixed(1)}
        unit="kilomètres"
        variant="red"
      />
    </div>
  );
};

export default StatsCards;
