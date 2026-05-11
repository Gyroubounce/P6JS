import styles from "./StatCard.module.css";

const StatCard = ({ title, value, unit, variant = "blue" }) => {
  return (
    <div className={styles.detailCard}>
      {/* Titre identique pour toutes les cartes */}
      <p className={styles.detailTitle}>{title}</p>

      {/* Valeur : rouge si variant = red, sinon valeur normale */}
      <p
        className={
          variant === "red"
            ? styles.detailValueRed
            : styles.detailValueBlue
        }
      >
        {value}

        {/* Unité : rouge ou bleu */}
        <span
          className={
            variant === "red"
              ? styles.unitRed
              : styles.unitBlue
          }
        >
          {" "}{unit}
        </span>
      </p>
    </div>
  );
};

export default StatCard;
