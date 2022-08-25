import { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import UserContext from "./Contexts/UserContext";
import PopupContext from "./Contexts/PopupContext";
import SongContext from "./Contexts/SongContext";
import Layout from "./components/Layout";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Popup from "./components/Popup";
import VideoPathContext from "./Contexts/VideoPathContext";
import SelectedPlaylistContext from "./Contexts/SelectedPlaylistContext";
import MessageContext from "./Contexts/MessageContext";
//const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const popup = useState("");
  const currentSong = useState(null);
  const selectedPlaylist = useState(null);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // debugger;
    // get token from local storage
    let token = localStorage.getItem("token");
    if (token && token != "") {
      setLoading(true);
      // get user by token
      axios
        .get(`${baseUrl}/users/`, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // console.log(token);
          setMessage("");
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (!(err.response.status >= 400 && err.response.status < 499)) {
            setMessage("Error occured, try again later");
          } else {
            setMessage(`Session ended or user not found
             try signin again`);
            console.log(err.response.data);
            localStorage.removeItem("token");
            setUser("");
            navigate("/login");
          }
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {" "}
      {loading ? (
        <span className="loading"> Loading...</span>
      ) : (
        <UserContext.Provider value={[user, setUser]}>
          <VideoPathContext.Provider value={[videoFilePath, setVideoFilePath]}>
            <SelectedPlaylistContext.Provider value={selectedPlaylist}>
              <SongContext.Provider value={currentSong}>
                <MessageContext.Provider value={[message, setMessage]}>
                  <PopupContext.Provider value={popup}>
                    <Header signedIn={user ? true : false} />
                    {message !== "" ? (
                      <div className="error">{message}</div>
                    ) : (
                      ""
                    )}
                    <Layout />
                    <Popup />
                  </PopupContext.Provider>
                </MessageContext.Provider>
              </SongContext.Provider>
            </SelectedPlaylistContext.Provider>
          </VideoPathContext.Provider>
        </UserContext.Provider>
      )}{" "}
    </div>
  );
}

export default App;
