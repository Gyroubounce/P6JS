import { useState } from "react";
import { useUser as useUserContext } from "../context/UserContext";

import {
  get4WeekBlocks,
  getWeeklyDistanceForBlock,
  getHeartRateSummary,
  getBPM,
  getAverageKmForBlock
} from "../utils/transformData";

import {
  getWeekRange,
  getCurrentWeekRange,
  parseLocalDate
} from "../utils/dateUtils";

import { computeWeeklyStats } from "../utils/WeekUtils";

const useUser = () => {

  // ------------------------------------------------------------
  // 🔥 HOOKS
  // ------------------------------------------------------------
  const { userData, loading } = useUserContext();

  const [isHovered, setIsHovered] = useState(false);
  const [distanceIndex, setDistanceIndex] = useState(0);
  const [bpmIndex, setBpmIndex] = useState(0);
  const [isAvgHovered, setIsAvgHovered] = useState(false);

  // ------------------------------------------------------------
  // 🔥 LOADING / NO DATA
  // ------------------------------------------------------------

  if (loading) {
    return {
      loading: true,
      profile: null,
      statistics: null,
      sessions: [],
    };
  }

  if (!userData) {
    return {
      loading: false,
      noData: true,
      profile: null,
      statistics: null,
      sessions: [],
    };
  }

  if (!userData.sessions || userData.sessions.length === 0) {
    return {
      loading: false,
      noSessions: true,
      profile: userData.profile ?? {},
      statistics: userData.statistics ?? {},
      sessions: [],
    };
  }


  // ------------------------------------------------------------
  // 🔥 SÉCURISATION DES DONNÉES
  // ------------------------------------------------------------
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

 
  const CustomLegend = () => ({
    min: true,
    max: true,
    moy: true
  });

  const { weekStart, formattedStart, formattedEnd } = getCurrentWeekRange();

  const {
    done,
    remaining,
    weeklyDuration,
    weeklyDistance,
    donutData
  } = computeWeeklyStats(safeSessions, weekStart);

  // ------------------------------------------------------------
  // 🔥 EXPORT
  // ------------------------------------------------------------
  return {
    loading: false,
    profile,
    statistics,

    // Distance
    isHovered,
    setIsHovered,
    distanceIndex,
    distanceBlock,
    weeklyDistanceData,
    averageKm,
    changeDistanceBlock,
    getYTicks,

    // BPM
    bpmIndex,
    bpmWeek,
    changeBpmBlock,
    bpm,
    heartRateData,
    isAvgHovered,
    setIsAvgHovered,

    // Weekly
    formattedStart,
    formattedEnd,
    done,
    remaining,
    weeklyDuration,
    weeklyDistance,
    donutData,

    // Utils
    format,
    CustomLegend
  };
};

export default useUser;
