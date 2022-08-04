import React, { useRef } from "react";
import "../../style/style.css";
import styles from "./style.module.css";

export default function SearchInput(props) {
  const refSearch = useRef(0);

  const btnSearchClick = () => {
    props.searchState(refSearch.current.value);
  };

  return (
    <div className={styles.searchDiv}>
      <input
        ref={refSearch}
        placeholder="Enter song/artist name"
        className="input"
      />
      <button className="button" onClick={btnSearchClick}>
        Search
      </button>
    </div>
  );
}
