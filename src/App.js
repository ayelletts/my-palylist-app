import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import { UserContext } from "./Contexts/UserContext";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState();

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
      </UserContext.Provider>
      <Layout />
    </>
  );
}

export default App;
