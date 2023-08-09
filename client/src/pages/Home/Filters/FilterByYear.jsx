import { selectYear } from "../../../redux/slices/appSlice.js";
import styles from"./Filter.module.css";
import { useSelector, useDispatch } from 'react-redux';
export default function FilterByYear() {
 const year = useSelector((state => state.app.year))
 const dispatch = useDispatch()
 const handleYearChange = (event) => {
  dispatch(selectYear(event.target.value));
 
}

  return (
    <div className={styles.filter}>
        <select value={year}  onChange={handleYearChange}>
          <option value='2023'>2023</option>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
        </select>
      </div>
  );
};
