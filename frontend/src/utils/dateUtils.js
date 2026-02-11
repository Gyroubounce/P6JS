// Utils de dates

/**
 * Formatte une date au format français court.
 * Exemple : "05 janv"
 */
export const formatDateFR = (date) =>
  date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });

/**
 * Retourne la semaine (lundi → dimanche) d'une date donnée.
 * Exemple : getWeekRange(new Date())
 */
export const getWeekRange = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = dimanche, 1 = lundi...

  // Trouver le lundi
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  // Trouver le dimanche
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { start: monday, end: sunday };
};

/**
 * Retourne la semaine actuelle (lundi → dimanche)
 * avec dates formatées FR.
 */
export const getCurrentWeekRange = () => {
  const { start, end } = getWeekRange(new Date());

  return {
    weekStart: start,
    weekEnd: end,
    formattedStart: start.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    formattedEnd: end.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  };
};

export const parseLocalDate = (isoString) => {
  const [y, m, d] = isoString.split("-");
  return new Date(y, m - 1, d);
};

export const formatDateTimeFR = (isoString) => {
  const d = new Date(isoString);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};
