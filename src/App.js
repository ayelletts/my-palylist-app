import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import UserContext from "./Contexts/UserContext";
import Layout from "./components/Layout";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    // get token from local storage
    let token = localStorage.getItem("token");
    if (token) {
      // get user by token
      axios
        .get("http://localhost:3000/users/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(token);
          setUser(res.data);
        });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        {/* <Header /> */}
        <Layout />
      </UserContext.Provider>
    </>
  );
}

export default App;
