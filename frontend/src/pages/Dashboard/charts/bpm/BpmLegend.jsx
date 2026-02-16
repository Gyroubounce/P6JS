import styles from "./BpmLegend.module.css";

const BpmLegend = () => {
  return (
    <div className={styles.legendContainer}>
      
      <div className={styles.legendItem}>
        <span className={`${styles.legendDot} ${styles.minDot}`}></span>
        <span>Min</span>
      </div>

      <div className={styles.legendItem}>
        <span className={`${styles.legendDot} ${styles.maxDot}`}></span>
        <span>Max BPM</span>
      </div>

      <div className={styles.legendItem}>
        <span className={`${styles.legendDot} ${styles.moyDot}`}></span>
        <span>Moy BPM</span>
      </div>

    </div>
  );
};

export default BpmLegend;
