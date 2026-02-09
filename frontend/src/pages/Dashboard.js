import { useState } from "react";
import { useUser } from "../context/UserContext";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "./Dashboard.module.css";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// 🔥 Import des utilitaires
import {
  get4WeekBlocks,
  getWeeklyDistanceForBlock,
  getHeartRateSummary,
  getDonutData,
  getAverageKmForBlock
} from "../utils/transformData";




const Dashboard = () => {
  const { userData, loading, weekBlockIndex, setWeekBlockIndex } = useUser();
  const [activeIndex, setActiveIndex] = useState(null);

  if (loading) return <p>Chargement des données...</p>;
  if (!userData) return <p>Impossible de récupérer les informations utilisateur.</p>;

  const { profile, statistics, sessions } = userData;

  // 🔥 Construire les blocs de 4 semaines
  const blocks = get4WeekBlocks(sessions);
  const currentBlock = blocks[weekBlockIndex] || blocks[0];


  // 🔥 Données dynamiques du bloc
  const weeklyDistanceData = getWeeklyDistanceForBlock(sessions, currentBlock);
  const heartRateData = getHeartRateSummary(sessions);
  const donutData = getDonutData(sessions, 6);
  const averageKm = getAverageKmForBlock(sessions, currentBlock);

  const format = (d) => d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  
  // Navigation entre blocs
  const changeBlock = (direction) => {
    const newIndex = weekBlockIndex + direction;
    if (newIndex >= 0 && newIndex < blocks.length) {
      setWeekBlockIndex(newIndex);
    }
  };

  const COLORS = ["#4e73df", "#e0e0e0"];

  const getYTicks = () => {
    const maxKm = Math.max(...weeklyDistanceData.map((d) => d.km), 10);
    const ticks = [];
    for (let i = 0; i <= maxKm + 10; i += 10) ticks.push(i);
    return ticks;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const km = payload[0].value;
      const data = payload[0].payload; 
      const format = (d) => 
        d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

      return (
        <div className={styles.customTooltip}>
          <div className={styles.tooltipLabel}>
            {format(data.startDate)} - {format(data.endDate)}
          </div>

          <div className={styles.tooltipValue}>{km} km</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>

        {/* Section 1 – Profil */}
        <section className={`${styles.section} ${styles.profileSection}`}>
          <div className={styles.profileCard}>
            <img
              src={profile.profilePicture || "/avatar.png"}
              alt="Profil"
              className={styles.photo}
            />
            <div className={styles.userInfo}>
              <h2 className={styles.name}>
                {profile.firstName} {profile.lastName}
              </h2>
              <p className={styles.memberSince}>
                Membre depuis {profile.createdAt}
              </p>
            </div>
          </div>

          <div className={styles.distanceWrapper}>
            <p className={styles.label}>Distance totale</p>
            <div className={styles.distanceCard}>
              <span className={styles.icon}>🏃‍♂️</span>
              <h2 className={styles.value}>{statistics.totalDistance} km</h2>
            </div>
          </div>
        </section>

        {/* Section 2 – Performances */}
        <section className={`${styles.section} ${styles.performanceSection}`}>
          <h3>Vos dernières performances</h3>

          <div className={styles.graphs}>

            {/* Graphique distance */}
            <div className={styles.graphCard}>
              <div className={styles.graphHeader}>
                <h4 className={styles.titleBlue}>{averageKm} km en moyenne</h4>

                <div className={styles.periodSelector}>
                  <button onClick={() => changeBlock(-1)}>{"<"}</button>
                    <span>  {format(currentBlock.startDate)} - {format(currentBlock.endDate)}</span>

                  <button onClick={() => changeBlock(1)}>{">"}</button>
                </div>
              </div>

              <p className={styles.summary}>
                Total des kilomètres sur ce bloc de 4 semaines
              </p>

              <div className={styles.graph}>
                <ResponsiveContainer>
                  <BarChart data={weeklyDistanceData} margin={{ top: 20, right: 40, left: 0, bottom: 10 }}>
                    <XAxis
                      dataKey="week"
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666", dy: 10 }}
                    />
                    <YAxis
                      tickLine={false}
                      ticks={getYTicks()}
                      tick={{ fontSize: 12, fill: "#666", dx: -10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                   <Legend
                      verticalAlign="bottom"
                      align="left"
                      iconType="circle"
                      iconSize={10}                     
                      wrapperStyle={{ left: 20 }}       
                      payload={[
                        { value: "Km", type: "circle", color: "#0b23f4" }, // couleur du cercle
                      ]}
                      formatter={(value, entry, index) => (
                        <span style={{ color: "#666", fontSize: 12 }}>{value}</span> 
                      )}
                    />

                    <Bar
                      dataKey="km"
                      barSize={12}
                      radius={[8, 8, 8, 8]}
                      onMouseEnter={(data, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {weeklyDistanceData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={index === activeIndex ? "#0b23f4" : "#b6bdfc"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Graphique BPM */}
            <div className={styles.graphCard}>
              <div className={styles.graphHeader}>
                <h4 className={styles.titleRed}>Fréquence cardiaque</h4>
                <div className={styles.periodSelector}>
                  <span>
                    Semaines {currentBlock.startWeek} à {currentBlock.endWeek}
                  </span>
                </div>
              </div>

              <p className={styles.summary}>Fréquence cardiaque moyenne</p>

              <div className={styles.graph}>
                <ResponsiveContainer>
                  <BarChart data={heartRateData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bpm" fill="#e74a3b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className={styles.legend}>
                <span className={styles.legendItem}>Repos</span>
                <span className={styles.legendItem}>Effort</span>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3 – Semaine */}
        <section className={`${styles.section} ${styles.weekSection}`}>
          <h3>Bloc de 4 semaines : {currentBlock.startWeek} → {currentBlock.endWeek}</h3>

          <div className={styles.weekStats}>
            <div className={styles.donutCard}>
              <div className={styles.donutHeader}>
                <span className={styles.donutTitle}>Objectif de 6</span>
                <span className={styles.donutValue}>{sessions.length}</span>
              </div>

              <p className={styles.donutLabel}>Courses réalisées</p>

              <div className={styles.donut}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={donutData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.detailCard}>
                <p className={styles.detailTitleBlue}>Durée totale</p>
                <p className={styles.detailValue}>{statistics.totalDuration} min</p>
              </div>

              <div className={styles.detailCard}>
                <p className={styles.detailTitleBlue}>Distance totale</p>
                <p className={styles.detailValueRed}>{statistics.totalDistance} km</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
