import styles from "./DistanceLegend.module.css";

const DistanceLegend = () => {
  return (
    <div className={styles.customLegend}>
      <div className={styles.legendItem}>
        <span className={styles.legendDot}></span>
        <span className={styles.legendText}>Km</span>
      </div>
    </div>
  );
};

export default DistanceLegend;
