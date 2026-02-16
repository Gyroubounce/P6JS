import styles from "./WeeklyBlock.module.css";
import DonutBlock from "../DonutBlock/DonutBlock";
import StatsCards from "../StatsCards/StatsCards";

const WeeklyBlock = ({
  formattedStart,
  formattedEnd,
  done,
  remaining,
  donutData,
  weeklyDuration,
  weeklyDistance
}) => {
  return (
    <section className={`${styles.section} ${styles.weekSection}`}>

      {/* Titre */}
      <h3>Cette semaine</h3>

      {/* Dates */}
      <p className={styles.dateWeek}>
        Du {formattedStart} au {formattedEnd}
      </p>

      <div className={styles.weekStats}>

        {/* Donut */}
        <DonutBlock
          done={done}
          remaining={remaining}
          donutData={donutData}
        />

        {/* StatCards */}
        <StatsCards
          weeklyDuration={weeklyDuration}
          weeklyDistance={weeklyDistance}
        />

      </div>
    </section>
  );
};

export default WeeklyBlock;
