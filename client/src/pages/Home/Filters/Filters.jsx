import FilterByYear from "./FilterByYear";
import FilterByMonth from "./FilterByMonth";
import styles from"./Filter.module.css";
export default function Filters() {
   
    
      return (
        <div className={styles.filters}>
          <FilterByYear  />
          <FilterByMonth />
        </div>
      );
    }
