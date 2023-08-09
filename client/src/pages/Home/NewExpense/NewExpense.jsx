import ExpenseForm from "./ExpenseForm";
import styles from "./NewExpense.module.css";
export default function NewExpense() {
  

  return (
    <div className={styles["new-expense"]}>
      <ExpenseForm />
    </div>
  );
}
