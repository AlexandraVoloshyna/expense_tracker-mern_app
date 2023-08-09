import styles from"./Filter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectMonth} from "../../../redux/slices/appSlice.js";
export default function FilterByMonth() {
  const month = useSelector((state)=> state.app.month)
  const dispatch = useDispatch()
  const handleMonthChange = (event) => {
    dispatch(selectMonth(event.target.value));
  };
  return (
    <div className={styles.filter}>
        <select value={month} onChange={handleMonthChange}>
          <option value="all">All</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
    </div>
  );
}
