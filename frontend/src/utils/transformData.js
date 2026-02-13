import { parseLocalDate } from "./dateUtils";

// 🔥 1) Construire des blocs de 4 semaines réelles (28 jours)
export const get4WeekBlocks = (sessions) => {
  if (!sessions.length) return [];

  // Trier les sessions par date (LOCAL)
  const sorted = [...sessions].sort(
    (a, b) => parseLocalDate(a.date) - parseLocalDate(b.date)
  );

  const firstDate = parseLocalDate(sorted[0].date);
  const lastDate = parseLocalDate(sorted[sorted.length - 1].date);

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
        const d = parseLocalDate(s.date);
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

// 🔥 3) Moyenne du bloc
export const getAverageKmForBlock = (sessions, block) => {
  const filtered = sessions.filter((s) => {
    const d = parseLocalDate(s.date);
    return d >= block.startDate && d <= block.endDate;
  });

  if (!filtered.length) return 0;

  const total = filtered.reduce((sum, s) => sum + s.distance, 0);
  return Number((total / filtered.length).toFixed(1));
};

// 🔥 Nouveau : BPM min / max / moyenne par jour
export const getHeartRateSummary = (sessions) => {
  if (sessions.length === 0) return [];

  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const grouped = {};

  sessions.forEach((s) => {
    const date = parseLocalDate(s.date);
    const dayIndex = (date.getDay() + 6) % 7; // Lundi = 0
    const dayName = days[dayIndex];

    if (!grouped[dayName]) {
      grouped[dayName] = { min: [], max: [], avg: [] };
    }

    grouped[dayName].min.push(s.heartRate.min);
    grouped[dayName].max.push(s.heartRate.max);
    grouped[dayName].avg.push((s.heartRate.min + s.heartRate.max) / 2);
  });

  return days.map((day) => {
    if (!grouped[day]) {
      return { day, min: 0, max: 0, avg: 0 };
    }

    const min = Math.round(
      grouped[day].min.reduce((a, b) => a + b, 0) / grouped[day].min.length
    );

    const max = Math.round(
      grouped[day].max.reduce((a, b) => a + b, 0) / grouped[day].max.length
    );

    const avg = Math.round(
      grouped[day].avg.reduce((a, b) => a + b, 0) / grouped[day].avg.length
    );

    return { day, min, max, avg };
  });
};

export const getBPM = (sessions) => {
  if (!sessions || sessions.length === 0) {
    return { avgHeartRate: 0 };
  }

  const avgHeartRate = Math.round(
    sessions.reduce(
      (sum, s) => sum + (s.heartRate.min + s.heartRate.max) / 2,
      0
    ) / sessions.length
  );

  return { avgHeartRate };
};


