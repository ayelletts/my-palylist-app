import React, { useRef } from "react";
// export default function SearchInput(props) {
//   const onChange = (e) => {
//     props.searchState(e.target.value);
//   };

//   return (
//     <>
//       <input
//         id="searchInput"
//         placeholder="Enter song name"
//         onChange={onChange}
//       />
//     </>
//   );
// }

export default function SearchInput(props) {
  const refSearch = useRef(0);

  const btnSearchClick = () => {
    props.searchState(refSearch.current.value);
  };

  return (
    <>
      <input id="searchInput" ref={refSearch} placeholder="Enter song name" />
      <button id="btnSearch" onClick={btnSearchClick}>
        Search
      </button>
    </>
  );
}
