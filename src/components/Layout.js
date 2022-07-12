import Search from "../pages/Search";
import Login from "../pages/Login";
import PlayList from "../pages/PlayList";
import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";

export default function Layout() {
  //להשתמש בקונטקסט של היוזר
  // check if user exist and route accoding to result
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/myList" element={<PlayList />} />
      <Route path="/users/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
