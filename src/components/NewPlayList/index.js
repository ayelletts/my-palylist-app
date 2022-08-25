import { useContext, useRef, useState } from "react";
import axios from "axios";
import SongContext from "../../Contexts/SongContext";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import "../../style/style.css";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../Contexts/MessageContext";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
// const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function NewPlaylist(props) {
  const currentSong = useContext(SongContext);
  const playlistNameRef = useRef("");
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useContext(MessageContext);
  const [showActivate, setShowActivate] = useState(false);

  const activatePlaylist = async (playlistId) => {
    const config = {
      method: "post",
      url: `${baseUrl}/playlist/activate/`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        email: props.email,
        playlistId: playlistId,
      },
    };
    await axios(config)
      .then((res) => {
        setMessage("");
        setUser(res.data.user);
        setPopup("");
      })
      .catch((err) => {
        if (!(err.response.status >= 400 && err.response.status < 499)) {
          switch (err.response.status) {
            default:
              setMessage("Error occured, try again later");
              break;
          }
        } else {
          setMessage(`Session ended or user not found
             try signin again`);
          console.log(err.response.data);
          setUser("");
          navigate("/login");
        }
      });
  };

  const createPlaylist = async (e) => {
    const config = {
      method: "post",
      url: `${baseUrl}/playlist/new/`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        email: props.email,
        imgUrl: currentSong.imgUrl,
        videoUrl: currentSong.videoUrl,
        title: playlistNameRef.current.value,
        songs: currentSong[0],
      },
    };
    await axios(config)
      .then((res) => {
        setMessage("");
        setUser(res.data);
        setPopup("");
      })
      .catch((err) => {
        setPopup("");
        if (!(err.response.status >= 400 && err.response.status < 499)) {
          let resp = [];
          switch (err.response.status) {
            case 509:
              resp = err.response.data.split("~");
              if (window.confirm(resp[0])) {
                activatePlaylist(resp[1]);
              }
              break;
            case 510:
              resp = err.response.data.split("~");
              setMessage(resp[0]);
              break;
            default:
              setMessage("Error occured, try again later");
              break;
          }
        } else {
          setMessage(`Session ended or user not found
             try signin again`);
          console.log(err.response.data);
          setUser("");
          navigate("/login");
        }
      });
  };
  return (
    <>
      <input
        placeholder="Playlist name..."
        type="text"
        ref={playlistNameRef}
        className="input"
      />

      <button onClick={createPlaylist} className="button">
        Create playList
      </button>
    </>
  );
}
