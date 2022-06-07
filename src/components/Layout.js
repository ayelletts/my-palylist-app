import Search from "../pages/Search";
import Login from "../pages/Login";
import PlayList from "../pages/PlayList";
import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";

export default function Layout() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/myList" element={<PlayList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
