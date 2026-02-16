import styles from "./BpmBlock.module.css";

import BpmChart from "../../../charts/bpm/BpmChart";
import BpmLegend from "../../../charts/bpm/BpmLegend";

const BpmBlock = ({
  bpm,
  bpmWeek,
  changeBpmBlock,
  heartRateData,
  isAvgHovered,
  setIsAvgHovered,
  format
}) => {
  return (
    <div className={styles.graphCard}>

      {/* Header */}
      <div className={styles.graphHeader}>
        <h4 className={styles.titleRed}>{bpm.avgHeartRate} BPM</h4>

        <div className={styles.periodSelector}>
          <button onClick={() => changeBpmBlock(-1)}>{"<"}</button>
          <span>
            {bpmWeek
              ? `${format(bpmWeek.start)} – ${format(bpmWeek.end)}`
              : "Aucune donnée"}
          </span>
          <button onClick={() => changeBpmBlock(1)}>{">"}</button>
        </div>
      </div>

      {/* Résumé */}
      <p className={styles.summary}>Fréquence cardiaque moyenne</p>

      {/* Graph */}
      <div className={styles.graphBpm}>
        <BpmChart
          heartRateData={heartRateData}
          isAvgHovered={isAvgHovered}
          setIsAvgHovered={setIsAvgHovered}
          CustomLegend={BpmLegend}
        />
      </div>

    </div>
  );
};

export default BpmBlock;
