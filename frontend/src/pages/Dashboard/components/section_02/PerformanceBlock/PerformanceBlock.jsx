import styles from "./PerformanceBlock.module.css";

import DistanceBlock from "../DistanceBlock/DistanceBlock";
import BpmBlock from "../BpmBlock/BpmBlock";

const PerformanceBlock = (props) => {
  return (
    <section className={`${styles.section} ${styles.performanceSection}`}>

      <h3>Vos dernières performances</h3>

      <div className={styles.graphs}>
        <DistanceBlock {...props} />
        <BpmBlock {...props} />
      </div>

    </section>
  );
};

export default PerformanceBlock;
