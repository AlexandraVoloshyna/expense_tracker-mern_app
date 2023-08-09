
import ExpensesList from "./ExpensesList";
import Filters from "../Filters/Filters";
import styles from "./Expenses.module.css";



export default function Expenses() {
  return (
    <div className={styles.expenses}>
      <Filters />
      <ExpensesList />
    </div>
  );
}
