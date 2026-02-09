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
