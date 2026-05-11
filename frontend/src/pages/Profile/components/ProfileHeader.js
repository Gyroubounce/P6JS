import { formatDateTimeFR } from "../../../utils/dateUtils";
import styles from "../Profile.module.css";

const ProfileHeader = ({ profile }) => {
  return (
    <div className={styles.cardHorizontal}>
      <div className={styles.photo}>
        <img
          src={
            profile.profilePicture
              ? `${process.env.REACT_APP_API_URL}/images/${profile.profilePicture}`
              : "/avatar.png"
          }
          alt="Profil"
        />

      </div>

      <div className={styles.infoBlock}>
        <h2>{profile.firstName} {profile.lastName}</h2>
        <p className={styles.memberSince}>
          Membre depuis {formatDateTimeFR(profile.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
