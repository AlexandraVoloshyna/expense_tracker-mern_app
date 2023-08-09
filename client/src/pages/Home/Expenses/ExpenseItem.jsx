import styles from "./ExpenseItem.module.css";
import ExpenseDate from "./ExpenseDate";
import { useDeleteExpenseMutation } from "../../../redux/slices/profileApiSlice";
export default function ExpenseItem(props) {

  const [deleteExpense] = useDeleteExpenseMutation();

  const handleDelete = async () => {
    try {
      await deleteExpense(props.id);
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className={styles["expense__item"]}>
      <ExpenseDate date={props.date} />
      <h2 className={styles["expense__item-title"]}>{props.title}</h2>
      <p className={styles["expense__item-price"]}>${props.price}</p>
      <button
        className={styles["expense__item-btn"]}
         onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
