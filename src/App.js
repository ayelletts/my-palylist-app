import { useState, useEffect } from "react";
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
// const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const popup = useState("");
  const currentSong = useState(null);
  const selectedPlaylist = useState(null);
  const [videoFilePath, setVideoFilePath] = useState(null);

  useEffect(() => {
    // debugger;
    // get token from local storage
    let token = localStorage.getItem("token");
    if (token) {
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
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          navigate("/");
          setLoading(false);
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
                <PopupContext.Provider value={popup}>
                  <Header signedIn={user ? true : false} />
                  <Layout />
                  <Popup />
                </PopupContext.Provider>
              </SongContext.Provider>
            </SelectedPlaylistContext.Provider>
          </VideoPathContext.Provider>
        </UserContext.Provider>
      )}{" "}
    </div>
  );
}

export default App;
