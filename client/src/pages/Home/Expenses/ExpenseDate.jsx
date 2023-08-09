import styles from"./ExpenseDate.module.css";

export default function ExpenseDate(props) {
  const date = new Date(props.date);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.toLocaleString("en-US", { year: "numeric" });
  return (
    <div className={styles["expense__date"]}>
      <div className={styles["expense__date-month"]}>{month}</div>
      <div className={styles["expense__date-year"]}>{year}</div>
      <div className={styles["expense__date-day"]}>{day}</div>
    </div>
  );
}
