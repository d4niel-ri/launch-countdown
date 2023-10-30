import styles from "./styles.module.scss";

// eslint-disable-next-line react/prop-types
const CardTimer = ({value}) => {
  return (
    <div className={styles.card}>
      {value}
    </div>
  )
}

export default CardTimer;