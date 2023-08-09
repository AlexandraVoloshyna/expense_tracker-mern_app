import ExpenseItem from './ExpenseItem';
import styles from './ExpensesList.module.css';
 import { useSelector } from 'react-redux';
import { useGetExpensesQuery } from '../../../redux/slices/profileApiSlice'

export default function ExpensesList(){
  const year = useSelector((state)=> state.app.year);
  const month = useSelector((state)=> state.app.month);
  const { data: expenses} = useGetExpensesQuery();
 
  const filteredExpenses = expenses
    ? expenses.filter((expense) => {
        const expenseYear = new Date(expense.date).getFullYear().toString();
        const expenseMonth = new Date(expense.date).toLocaleString('en-US', { month: '2-digit' });

        return (expenseYear === year) && (month === 'all' || expenseMonth === month);
      })
    : [];



  if (filteredExpenses.length === 0) {
    return <h2 className={styles['expenses-list__fallback']}>Found no expenses.</h2>;
  }



  return (
    <ul className={styles['expenses-list']}>
      {filteredExpenses.map((expense) => (
        <ExpenseItem
          key ={expense._id}
          id={expense._id}
          title={expense.title}
          price={expense.price}
          date={expense.date}
        />
      ))}
    </ul>
  );
};
