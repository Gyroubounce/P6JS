import React from "react";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import styles from "./Profile.module.css";
import "../../index.css";

import { useUser } from "../../context/UserContext";

import ProfileHeader from "./components/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails";
import ProfileStatsIntro from "./components/ProfileStatsIntro";
import ProfileStatsCards from "./components/ProfileStatsCards";

const Profile = () => {
  const { userData, loading } = useUser();

  if (loading) return <p>Chargement des données...</p>;
  if (!userData || !userData.profile) return <p>Impossible de récupérer les informations utilisateur.</p>;

  const { profile, statistics } = userData;

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <div className={styles.left}>
          <ProfileHeader profile={profile} />
          <ProfileDetails profile={profile} />
        </div>

        <div className={styles.right}>
          <ProfileStatsIntro profile={profile} />
          <ProfileStatsCards statistics={statistics} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
