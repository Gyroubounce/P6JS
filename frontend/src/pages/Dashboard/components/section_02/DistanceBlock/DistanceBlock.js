import styles from "./DistanceBlock.module.css";

import DistanceChart from "../../../charts/distance/DistanceChart";

import DistanceLegend from "../../../charts/distance/DistanceLegend";

const DistanceBlock = ({
  averageKm,
  distanceBlock,
  changeDistanceBlock,
  weeklyDistanceData,
  isHovered,
  setIsHovered,
  getYTicks,
  format
}) => {
  return (
    <div className={styles.graphCard}>

      {/* Header */}
      <div className={styles.graphHeader}>
        <h4 className={styles.titleBlue}>{averageKm} km en moyenne</h4>

        <div className={styles.periodSelector}>
          <button onClick={() => changeDistanceBlock(-1)}>{"<"}</button>

          <span>
            {distanceBlock
              ? `${format(distanceBlock.startDate)} – ${format(distanceBlock.endDate)}`
              : "Aucune donnée"}
          </span>

          <button onClick={() => changeDistanceBlock(1)}>{">"}</button>
        </div>
      </div>

      {/* Résumé */}
      <p className={styles.summary}>
        Total des kilomètres sur ce bloc de 4 semaines
      </p>

      {/* Graph */}
      <div className={styles.graph}>
        <DistanceChart
          weeklyDistanceData={weeklyDistanceData}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          getYTicks={getYTicks}
          format={format}
        />
      </div>

      {/* Légende */}
      <DistanceLegend />

    </div>
  );
};

export default DistanceBlock;
