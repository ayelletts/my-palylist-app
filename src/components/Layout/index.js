import Search from "../../pages/Search";
import Login from "../../pages/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/Signup";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import Home from "../../pages/Home";

export default function Layout() {
  const [user, setUser] = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users/signup" element={<Signup />} />
      {user && (
        <>
          <Route path="/search" element={<Search />} />
          <Route path="/myList" element={<Home />} />
        </>
      )}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
