

// 🔥 1) Construire des blocs de 4 semaines réelles (28 jours)
export const get4WeekBlocks = (sessions) => {
  if (!sessions.length) return [];

  // Trier les sessions par date
  const sorted = [...sessions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const firstDate = new Date(sorted[0].date);
  const lastDate = new Date(sorted[sorted.length - 1].date);

  const blocks = [];
  let start = new Date(firstDate);

  while (start <= lastDate) {
    const end = new Date(start);
    end.setDate(start.getDate() + 27); // 4 semaines = 28 jours

    blocks.push({
      startDate: new Date(start),
      endDate: new Date(end),
    });

    // Bloc suivant = +28 jours
    start.setDate(start.getDate() + 28);
  }

  return blocks;
};

// 🔥 2) Distance par semaine dans un bloc réel
export const getWeeklyDistanceForBlock = (sessions, block) => {
  const result = [];

  let weekStart = new Date(block.startDate);

  for (let i = 0; i < 4; i++) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const km = sessions
      .filter((s) => {
        const d = new Date(s.date);
        return d >= weekStart && d <= weekEnd;
      })
      .reduce((sum, s) => sum + s.distance, 0);

    result.push({
      week: `S${i + 1}`,
      km: Number(km.toFixed(1)),
      startDate: new Date(weekStart), 
      endDate: new Date(weekEnd),
    });

    // Semaine suivante
    weekStart.setDate(weekStart.getDate() + 7);
  }

  return result;
};

// 🔥 3) BPM repos / effort
export const getHeartRateSummary = (sessions) => {
  if (sessions.length === 0) return [];

  const avgRest = Math.round(
    sessions.reduce((sum, s) => sum + s.heartRate.min, 0) / sessions.length
  );

  const avgEffort = Math.round(
    sessions.reduce((sum, s) => sum + s.heartRate.max, 0) / sessions.length
  );

  return [
    { name: "Repos", bpm: avgRest },
    { name: "Effort", bpm: avgEffort },
  ];
};

// 🔥 4) Donut sessions réalisées vs objectif
export const getDonutData = (sessions, goal = 6) => {
  const done = sessions.length;
  return [
    { name: "Réalisé", value: done },
    { name: "Restant", value: Math.max(goal - done, 0) },
  ];
};

// 🔥 5) Moyenne du bloc
export const getAverageKmForBlock = (sessions, block) => {
  const filtered = sessions.filter((s) => {
    const d = new Date(s.date);
    return d >= block.startDate && d <= block.endDate;
  });

  if (!filtered.length) return 0;

  const total = filtered.reduce((sum, s) => sum + s.distance, 0);
  return Number((total / filtered.length).toFixed(1));
};
