import Search from "./SearchInput";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <nav>
        <Link to="/">Login | </Link>
        <Link to="/search">Search | </Link>
        <Link to="/myList">My Songs</Link>
      </nav>
      {/*  <Search /> */}
    </>
  );
}
