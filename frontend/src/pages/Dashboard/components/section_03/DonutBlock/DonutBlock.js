import styles from "./DonutBlock.module.css";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const DonutBlock = ({ done, remaining, donutData }) => {
  return (
    <div className={styles.donutCard}>

      <div className={styles.donutHeader}>
        <span className={styles.donutValue}>x{done}</span>
        <span className={styles.donutTitle}> sur objectif de 6</span>
      </div>

      <p className={styles.donutLabel}>Courses hebdomadaire réalisées</p>

      <div className={styles.donutRow}>

        {/* Légende gauche */}
        <div className={styles.legendLeft}>
          <span className={styles.dotBlue}></span>
          <span>{done} Réalisées</span>
        </div>

        {/* Donut */}
        <div className={styles.donut}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                startAngle={270}
                endAngle={-90}
              >
                <Cell fill="#0b23f4" />
                <Cell fill="#b6bdfc" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Légende droite */}
        <div className={styles.legendRight}>
          <span className={styles.dotGrey}></span>
          <span>{remaining} Restantes</span>
        </div>

      </div>
    </div>
  );
};

export default DonutBlock;
