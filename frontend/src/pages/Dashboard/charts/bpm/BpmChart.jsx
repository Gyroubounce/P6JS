import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const BpmChart = ({
  heartRateData,
  isAvgHovered,
  setIsAvgHovered,
  CustomLegend
}) => {
  return (
    <ResponsiveContainer>
      <ComposedChart
        data={heartRateData}
        margin={{ top: 20, right: 20, left: 0, bottom: 25 }}
      >
        <XAxis
          dataKey="day"
          tickLine={false}
          tick={{ fontSize: 12, dy: 15 }}
        />

        <YAxis
          tickLine={false}
          tick={{ fontSize: 11, dx: -10 }}
        />

        {/* Tooltip désactivé comme dans ton code */}
        <Tooltip wrapperStyle={{ display: "none" }} cursor={false} />

        {/* Barres min / max */}
        <Bar dataKey="min" barSize={14} fill="#fcc1b6" radius={[10, 10, 10, 10]} />
        <Bar dataKey="max" barSize={14} fill="#f4320b" radius={[10, 10, 10, 10]} />

        {/* Ligne moyenne */}
        <Line
          type="monotone"
          dataKey="avg"
          dot={{ r: 3, fill: "#0b23f4", stroke: "#0b23f4" }}
          stroke={isAvgHovered ? "#0b23f4" : "#b6bdfc"}
          strokeWidth={3}
          onMouseOver={() => setIsAvgHovered(true)}
          onMouseOut={() => setIsAvgHovered(false)}
          activeDot={false}
        />

        {/* Légende personnalisée */}
        <Legend content={<CustomLegend />} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BpmChart;
