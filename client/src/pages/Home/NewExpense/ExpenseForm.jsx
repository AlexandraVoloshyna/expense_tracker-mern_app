import styles from "./ExpenseForm.module.css";
import { useState } from "react";
import { useAddExpenseMutation } from "../../../redux/slices/profileApiSlice";
import { toast } from 'react-toastify';
export default function ExpenseForm() {
  const [addExpense] = useAddExpenseMutation()
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredPrice: "",
    enteredDate: "",
  });

  const changeTitleHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredTitle: event.target.value,
      };
    });
  };
  const changePriceHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredPrice: event.target.value,
      };
    });
  };
  const changeDateHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredDate: event.target.value,
      };
    });
  };
  const submitHandler = async () => {
    
    try {
      const expenseData = {
        title: userInput.enteredTitle,
        price: +userInput.enteredPrice,
        date: new Date(userInput.enteredDate),
      };
       await addExpense({...expenseData}).unwrap();
      setUserInput({
        enteredTitle: "",
        enteredPrice: "",
        enteredDate: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={(e)=> e.preventDefault()}>
      <div className={styles["new-expense__controls"]}>
        <div className={styles["new-expense__control"]}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            onChange={changeTitleHandler}
            value={userInput.enteredTitle}
          />
        </div>
        <div className={styles["new-expense__control"]}>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="number"
            min="1.00"
            step="1.00"
            onChange={changePriceHandler}
            value={userInput.enteredPrice}
          />
        </div>
        <div className={styles["new-expense__control"]}>
          <label htmlFor="date">Date</label>
          <input
            name="date"
            type="date"
            min="2021-01-01"
            max="2023-12-31"
            onChange={changeDateHandler}
            value={userInput.enteredDate}
          />
        </div>
      </div>
      <div className={styles["new-expense__actions"]}>
        <button type="submit" onClick={submitHandler}>Add new expense</button>
      </div>
    </form>
  );
}
