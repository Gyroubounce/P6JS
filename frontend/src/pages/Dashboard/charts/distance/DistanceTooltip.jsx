import styles from "./DistanceTooltip.module.css";
import { formatDateFR } from "../../../../utils/dateUtils";

const DistanceTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const km = payload[0].value;
  const data = payload[0].payload;

  return (
    <div className={styles.customTooltip}>
      <div className={styles.tooltipLabel}>
        {formatDateFR(new Date(data.startDate))} – {formatDateFR(new Date(data.endDate))}
      </div>
      <div className={styles.tooltipValue}>{km} km</div>
    </div>
  );
};

export default DistanceTooltip;
