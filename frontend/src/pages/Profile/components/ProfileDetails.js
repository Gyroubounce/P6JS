import styles from "../Profile.module.css";

const ProfileDetails = ({ profile }) => {
  return (
    <div className={styles.card}>
      <h3>Votre profil</h3>
      <div className={styles.separator}></div>

      <p>Âge : {profile.age} ans</p>
      <p>Genre : {profile.gender || "Non précisé"}</p>
      <p>Taille : {profile.height} cm</p>
      <p>Poids : {profile.weight} kg</p>
    </div>
  );
};

export default ProfileDetails;
