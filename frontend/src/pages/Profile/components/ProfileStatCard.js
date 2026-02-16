import styles from "../Profile.module.css";

const ProfileStatCard = ({ title, value, unit }) => {
  return (
    <div className={styles.statCard}>
      <h4>{title}</h4>

      <p className={styles.statValue}>
        {value}
        {unit && <span className={styles.unit}> {unit}</span>}
      </p>
    </div>
  );
};

export default ProfileStatCard;
