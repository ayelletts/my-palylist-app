import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import UserContext from "./Contexts/UserContext";
import Layout from "./components/Layout";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // debugger;
    // get token from local storage
    let token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      // get user by token
      axios
        .get("http://localhost:3000/users/", {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(token);
          setUser(res.data);
          setLoading(false);
        });
      // .catch((err) => {
      //   console.log(err.response.message);
      // });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        "Loading..."
      ) : (
        <UserContext.Provider value={[user, setUser]}>
          {/* <Header /> */}
          <Layout />
        </UserContext.Provider>
      )}{" "}
    </>
  );
}

export default App;
