import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import styles from "./Dashboard.module.css";

import useUser from "../../hooks/useUser";

// SECTION 01
import ProfileBlock from "./components/section_01/ProfileBlock/ProfileBlock";

// SECTION 02
import PerformanceBlock from "./components/section_02/PerformanceBlock/PerformanceBlock";

// SECTION 03
import WeeklyBlock from "./components/section_03/WeeklyBlock/WeeklyBlock";

const Dashboard = () => {
  const {
    loading,
    noData,
    noSessions,

    // Profil
    profile,
    statistics,

    // Distance
    averageKm,
    distanceBlock,
    changeDistanceBlock,
    weeklyDistanceData,
    isHovered,
    setIsHovered,
    getYTicks,

    // BPM
    bpm,
    bpmWeek,
    changeBpmBlock,
    heartRateData,
    isAvgHovered,
    setIsAvgHovered,

    // Weekly
    formattedStart,
    formattedEnd,
    done,
    remaining,
    donutData,
    weeklyDuration,
    weeklyDistance,

    // Utils
    format
  } = useUser();

  // ------------------------------------------------------------
  // 🔥 LOADING / NO DATA
  // ------------------------------------------------------------
  if (loading) return <p>Chargement des données...</p>;
  if (noData) return <p>Aucune donnée utilisateur.</p>;
  if (noSessions) return <p>Aucune session trouvée.</p>;

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>

        {/* SECTION 1 – Profil */}
        <ProfileBlock profile={profile} statistics={statistics} />

        {/* SECTION 2 – Performances */}
        <PerformanceBlock
          averageKm={averageKm}
          distanceBlock={distanceBlock}
          changeDistanceBlock={changeDistanceBlock}
          weeklyDistanceData={weeklyDistanceData}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          getYTicks={getYTicks}
          bpm={bpm}
          bpmWeek={bpmWeek}
          changeBpmBlock={changeBpmBlock}
          heartRateData={heartRateData}
          isAvgHovered={isAvgHovered}
          setIsAvgHovered={setIsAvgHovered}
          format={format}
        />

        {/* SECTION 3 – Semaine */}
        <WeeklyBlock
          formattedStart={formattedStart}
          formattedEnd={formattedEnd}
          done={done}
          remaining={remaining}
          donutData={donutData}
          weeklyDuration={weeklyDuration}
          weeklyDistance={weeklyDistance}
        />

      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
