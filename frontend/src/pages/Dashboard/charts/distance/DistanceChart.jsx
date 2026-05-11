import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

import DistanceTooltip from "./DistanceTooltip";

const DistanceChart = ({
  weeklyDistanceData,
  isHovered,
  setIsHovered,
  getYTicks
}) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={weeklyDistanceData}
        margin={{ top: 20, right: 40, left: 0, bottom: 10 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <XAxis
          dataKey="week"
          tickLine={false}
          tick={{ fontSize: 11, dy: 15 }}
        />

        <YAxis
          tickLine={false}
          ticks={getYTicks()}
          tick={{ fontSize: 11, dx: -10 }}
        />

        {/* Tooltip personnalisé avec format */}
        <Tooltip content={<DistanceTooltip />} cursor={false} />

        <Bar dataKey="km" barSize={14} radius={[10, 10, 10, 10]}>
          {weeklyDistanceData.map((entry, index) => (
            <Cell
              key={index}
              fill={isHovered ? "#0b23f4" : "#b6bdfc"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DistanceChart;
