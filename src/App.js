import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import UserContext from "./Contexts/UserContext";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState({
    username: "testUser",
    userid: "1",
    playlists: ["1,2,3", "11,22,33", "211,311,411"],
    token: "123456",
  });

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <Layout />
      </UserContext.Provider>
    </>
  );
}

export default App;
