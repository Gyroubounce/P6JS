import { useState } from "react";
import { useUser } from "../../context/UserContext";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import styles from "./Dashboard.module.css";
import IconeDistance from "../../assets/icons/Icone_Distance.jpeg";


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
  Legend,
  ComposedChart,
  Line
} from "recharts";

import {
  get4WeekBlocks,
  getWeeklyDistanceForBlock,
  getHeartRateSummary,
  getBPM,
  getAverageKmForBlock
} from "../../utils/transformData";

import { getWeekRange, getCurrentWeekRange, parseLocalDate, formatDateTimeFR } from "../../utils/dateUtils";
import { computeWeeklyStats } from "../../utils/WeekUtils";

const Dashboard = () => {
  const { userData, loading } = useUser();

  // 🔥 HOOKS
  const [isHovered, setIsHovered] = useState(false);
  const [distanceIndex, setDistanceIndex] = useState(0);
  const [bpmIndex, setBpmIndex] = useState(0);
  const [isAvgHovered, setIsAvgHovered] = useState(false);



  // 🔥 LOADING / NO DATA
  if (loading) return <p>Chargement des données...</p>;
  if (!userData) return <p>Aucune donnée utilisateur.</p>;
  if (!userData.sessions || userData.sessions.length === 0) {
  return <p>Aucune session trouvée.</p>;
}


  // 🔥 SÉCURISATION DES DONNÉES
  const profile = userData.profile ?? {};
  const statistics = userData.statistics ?? {};
  const safeSessions = Array.isArray(userData.sessions) ? userData.sessions : [];

  // ------------------------------------------------------------
  // 🔵 BLOC DISTANCE (4 semaines)
  // ------------------------------------------------------------
  const blocks = get4WeekBlocks(safeSessions);
  const distanceBlock = blocks[distanceIndex] ?? blocks[0] ?? null;

  const weeklyDistanceData = distanceBlock
    ? getWeeklyDistanceForBlock(safeSessions, distanceBlock)
    : [];

  const averageKm = distanceBlock
    ? getAverageKmForBlock(safeSessions, distanceBlock)
    : 0;

  const changeDistanceBlock = (direction) => {
    const newIndex = distanceIndex + direction;
    if (newIndex >= 0 && newIndex < blocks.length) {
      setDistanceIndex(newIndex);
    }
  };

  // ------------------------------------------------------------
  // 🔴 BLOC BPM (semaine)
  // ------------------------------------------------------------
  const weeks = safeSessions
    .map((s) => getWeekRange(parseLocalDate(s.date)))
    .filter(
      (week, index, arr) =>
        index === arr.findIndex((w) => w.start.getTime() === week.start.getTime())
    )
    .sort((a, b) => a.start - b.start);

  const bpmWeek = weeks[bpmIndex] ?? weeks[0] ?? null;

  const changeBpmBlock = (direction) => {
    const newIndex = bpmIndex + direction;
    if (newIndex >= 0 && newIndex < weeks.length) {
      setBpmIndex(newIndex);
    }
  };

  const sessionsForBpmWeek = bpmWeek
    ? safeSessions.filter((s) => {
        const d = parseLocalDate(s.date);
        return d >= bpmWeek.start && d <= bpmWeek.end;
      })
    : [];

  const bpm = getBPM(sessionsForBpmWeek);
  const heartRateData = getHeartRateSummary(sessionsForBpmWeek);

  // ------------------------------------------------------------
  // 🔘 DONUT
  // ------------------------------------------------------------
  

  const format = (d) =>
    d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });



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

 const CustomLegend = () => {
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



  const { weekStart, formattedStart, formattedEnd } = getCurrentWeekRange();

const {
  done,
  remaining,
  weeklyDuration,
  weeklyDistance,
  donutData,
} = computeWeeklyStats(safeSessions, weekStart, );



  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>

        {/* Section 1 – Profil */}
        <section className={`${styles.section} ${styles.profileSection}`}>
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
              <h2 className={styles.value}>{statistics.totalDistance ?? 0} km</h2>
            </div>
          </div>
        </section>

        {/* Section 2 – Performances */}
        <section className={`${styles.section} ${styles.performanceSection}`}>
          <h3>Vos dernières performances</h3>

          <div className={styles.graphs}>

            {/* 🔵 Graphique Distance */}
            <div className={styles.graphCard}>
              <div className={styles.graphHeader}>
                <h4 className={styles.titleBlue}>{averageKm}km en moyenne</h4>

                <div className={styles.periodSelector}>
                  <button onClick={() => changeDistanceBlock(-1)}>{"<"}</button>
                  <span>
                    {distanceBlock
                      ? `${format(distanceBlock.startDate)} – ${format(distanceBlock.endDate)}`
                      : "Aucune donnée"}
                  </span>
                  <button onClick={() => changeDistanceBlock(1)}>{">"}</button>
                </div>
              </div>

              <p className={styles.summary}>
                Total des kilomètres sur ce bloc de 4 semaines
              </p>

              <div className={styles.graph}>
                <ResponsiveContainer>
                  <BarChart
                    data={weeklyDistanceData}
                    margin={{ top: 20, right: 40, left: 0, bottom: 10 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <XAxis dataKey="week" tickLine={false} tick={{ fontSize: 11, dy: 15 }} />
                    <YAxis tickLine={false} ticks={getYTicks()} tick={{ fontSize: 11, dx: -10 }}  />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                  
                    <Bar dataKey="km" barSize={14} radius={[10, 10, 10, 10]}>
                      {weeklyDistanceData.map((entry, index) => (
                        <Cell key={index} fill={isHovered ? "#0b23f4" : "#b6bdfc"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className={styles.customLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot}></span>
                  <span className={styles.legendText}>Km</span>
                </div>
              </div>

            </div>

            {/* 🔴 Graphique BPM */}
            <div className={styles.graphCard}>
              <div className={styles.graphHeader}>
                <h4 className={styles.titleRed}>
                  {bpm.avgHeartRate} BPM
                </h4>

                <div className={styles.periodSelector}>
                  <button onClick={() => changeBpmBlock(-1)}>{"<"}</button>
                  <span>
                    {bpmWeek
                      ? `${format(bpmWeek.start)} – ${format(bpmWeek.end)}`
                      : "Aucune donnée"}
                  </span>
                  <button onClick={() => changeBpmBlock(1)}>{">"}</button>
                </div>
              </div>

              <p className={styles.summary}>Fréquence cardiaque moyenne</p>

              <div className={styles.graphBpm}>
                <ResponsiveContainer>
                  <ComposedChart
                    data={heartRateData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                  >
                    <XAxis dataKey="day" tickLine={false} tick={{ fontSize: 12, dy: 15 }} />
                    <YAxis tickLine={false} tick={{ fontSize: 11, dx: -10 }} />
                    <Tooltip wrapperStyle={{ display: "none" }} cursor={false} />


                    <Bar dataKey="min" barSize={14} fill="#fcc1b6" radius={[10, 10, 10, 10]} />
                    <Bar dataKey="max" barSize={14} fill="#f4320b" radius={[10, 10, 10, 10]} />

                   <Line
                      type="monotone"
                      dataKey="avg"
                      dot={{ r: 3, fill: "#0b23f4", stroke: "#0b23f4", }}
                      stroke={isAvgHovered ? "#0b23f4" : "#b6bdfc"}  
                      strokeWidth={3}
                      onMouseOver={() => setIsAvgHovered(true)}
                      onMouseOut={() => setIsAvgHovered(false)}
                      activeDot={false}
                    />


                   <Legend content={<CustomLegend />} />

                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3 – Donut */}
        <section className={`${styles.section} ${styles.weekSection}`}>
          <h3>Cette semaine</h3>

          <p className={styles.dateWeek}>Du {formattedStart} au {formattedEnd}</p>

          <div className={styles.weekStats}>
            <div className={styles.donutCard}>
              <div className={styles.donutHeader}>
                <span className={styles.donutValue}>x{done}</span>
                <span className={styles.donutTitle}> sur objectif de 6</span>
              </div>

              <p className={styles.donutLabel}>Courses hebdomadaire réalisées</p>

              {/* 🔥 DONUT ROW — tout doit être dedans */}
              <div className={styles.donutRow}>

                {/* Légende gauche */}
                <div className={styles.legendLeft}>
                  <span className={styles.dotBlue}></span>
                  <span>{done} Réalisées</span>
                </div>

                {/* Donut */}
                <div className={styles.donut}>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={donutData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        startAngle={270}
                        endAngle={-90}
                      >
                        <Cell fill="#0b23f4" />
                        <Cell fill="#b6bdfc" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Légende droite */}
                <div className={styles.legendRight}>
                  <span className={styles.dotGrey}></span>
                  <span>{remaining} Restantes</span>
                </div>

              </div> {/* 🔥 FIN donutRow */}

            </div> {/* fin donutCard */}

            {/* Détails */}
            <div className={styles.details}>
              <div className={styles.detailCard}>
                <p className={styles.detailTitleBlue}>Durée d'activité</p>
                <p className={styles.detailValue}>
                  {weeklyDuration}
                  <span className={styles.unitBlue}> minutes</span>
                </p>
              </div>

              <div className={styles.detailCard}>
                <p className={styles.detailTitleBlue}>Distance</p>
                <p className={styles.detailValueRed}>
                  {weeklyDistance.toFixed(1)}
                  <span className={styles.unitRed}> kilomètres</span>
                </p>
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
