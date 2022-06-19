//import { useContext } from "react";
//import SearchContext from "./Main";

import React, { useRef } from "react";

export default function SearchInput(props) {
  const onChange = (e) => {
    props.searchState(e.target.value);
  };

  return (
    <>
      <input
        id="searchInput"
        placeholder="Enter song name"
        onChange={onChange}
      />
    </>
  );
}

// export default function SearchInput(props) {
//   const refSearch = useRef();

//   const onClick = (ref) => {
//     // props.searchState(ref.current.value);
//     props.searchState(document.getElementById("searchInput").value);
//   };

//   return (
//     <>
//       <input id="searchInput" ref={refSearch} placeholder="Enter song name" />
//       <button onClick={onClick(refSearch)}>Search</button>
//     </>
//   );
// }
