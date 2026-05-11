export const userMock = {
  id: 1,

  profile: {
    firstName: "John",
    lastName: "Doe",
    age: 31,
  },

  statistics: {
    calorieCount: 1930,
    proteinCount: 155,
    carbohydrateCount: 290,
    lipidCount: 50,
  },

  todayScore: 0.7,

  sessions: [
    {
      date: "2024-01-01",
      distance: 5.2,
      heartRate: { min: 120, max: 160 }
    },
    {
      date: "2024-01-02",
      distance: 6.1,
      heartRate: { min: 118, max: 158 }
    },
    {
      date: "2024-01-03",
      distance: 4.8,
      heartRate: { min: 122, max: 165 }
    },
    {
      date: "2024-01-04",
      distance: 7.0,
      heartRate: { min: 125, max: 170 }
    }
  ]
};
