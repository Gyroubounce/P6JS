export function transformUserData(user, sessions) {
  const profile = user.profile;
  const now = new Date();

  const validSessions = sessions.filter(s => new Date(s.date) <= now);

  const totalDistance = Math.round(
    validSessions.reduce((sum, s) => sum + (s.distance || 0), 0)
  );

  const totalDurationMinutes = validSessions.reduce(
    (sum, s) => sum + (s.duration || 0),
    0
  );
  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const totalDuration = { hours, minutes };

  const totalCalories = validSessions.reduce(
    (sum, s) => sum + (s.caloriesBurned || 0),
    0
  );

  const totalSessions = validSessions.length;
  const activeDays = new Set(validSessions.map(s => s.date)).size;

  const firstSessionDate = validSessions.length
    ? new Date(validSessions[0].date)
    : now;
  const totalDays = Math.floor((now - firstSessionDate) / (1000 * 60 * 60 * 24));
  const restDays = Math.max(totalDays - activeDays, 0);

  return {
    profile,
    statistics: {
      totalDistance,
      totalDuration,
      totalSessions,
      totalCalories,
      activeDays,
      restDays
    },
    sessions: validSessions   // ✅ au niveau racine, comme useUser l’attend
  };
}
