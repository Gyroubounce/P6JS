import styles from "./ProfileBlock.module.css";
import IconeDistance from "../../../../../assets/icons/Icone_Distance.jpeg";
import { formatDateTimeFR } from "../../../../../utils/dateUtils";

const ProfileBlock = ({ profile, statistics }) => {
  return (
    <section className={styles.profileSection}>
      
      <div className={styles.profileCard}>
        <div className={styles.photo}>
          <img
            src={profile.profilePicture || "/avatar.png"}
            alt="Profil"
          />
        </div>

        <div className={styles.userInfo}>
          <h2 className={styles.name}>
            {profile.firstName} {profile.lastName}
          </h2>
          <p className={styles.memberSince}>
            Membre depuis le {formatDateTimeFR(profile.createdAt)}
          </p>
        </div>
      </div>

      <div className={styles.distanceWrapper}>
        <p className={styles.label}>Distance totale parcourue</p>

        <div className={styles.distanceCard}>
          <span className={styles.icon}>
            <img src={IconeDistance} alt="Distance totale parcourue" />
          </span>

          <h2 className={styles.value}>
            {statistics.totalDistance ?? 0} km
          </h2>
        </div>
      </div>

    </section>
  );
};

export default ProfileBlock;
