// Utils de calculs hebdomadaires
// src/utils/WeekUtils.js

import { getWeekRange, parseLocalDate } from "./dateUtils";

/**
 * Calcule les statistiques de la semaine :
 * - sessions réalisées
 * - sessions restantes (objectif = 6)
 * - durée totale
 * - distance totale
 * - données pour le donut
 */
export const computeWeeklyStats = (sessions, date = new Date(), goal = 6) => {
  // Récupère le lundi et dimanche de la semaine
  const { start: weekStart, end: weekEnd } = getWeekRange(date);


  // Filtre les sessions de la semaine (LOCAL DATE)
  const sessionsThisWeek = sessions.filter((s) => {
    const d = parseLocalDate(s.date);
    return d >= weekStart && d <= weekEnd;
  });

  // Nombre de sessions faites
  const done = sessionsThisWeek.length;

  // Sessions restantes
  const remaining = Math.max(goal - done, 0);

  // Durée totale
  const weeklyDuration = sessionsThisWeek.reduce(
    (sum, s) => sum + (s.duration || 0),
    0
  );

  // Distance totale
  const weeklyDistance = sessionsThisWeek.reduce(
    (sum, s) => sum + (s.distance || 0),
    0
  );

  // Donut data
  const donutData = [
    { name: "Réalisées", value: done },
    { name: "Restantes", value: remaining },
  ];

  return {
    weekStart,
    weekEnd,
    sessionsThisWeek,
    done,
    remaining,
    weeklyDuration,
    weeklyDistance,
    donutData,
  };
};
