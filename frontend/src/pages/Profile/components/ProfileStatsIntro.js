import { formatDateTimeFR } from "../../../utils/dateUtils";
import styles from "../Profile.module.css";

const ProfileStatsIntro = ({ profile }) => {
  return (
    <div className={styles.statsIntro}>
      <h3>Vos statistiques</h3>
      <p>depuis le {formatDateTimeFR(profile.createdAt)}</p>
    </div>
  );
};

export default ProfileStatsIntro;
