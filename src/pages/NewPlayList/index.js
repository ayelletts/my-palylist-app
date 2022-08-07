import { useContext, useRef } from "react";
import axios from "axios";
import SongContext from "../../Contexts/SongContext";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import "../../style/style.css";
// const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

export default function NewPlaylist(props) {
  debugger;
  const currentSong = useContext(SongContext);
  const playlistNameRef = useRef("");
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);

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
    await axios(config).then((res) => {
      setUser(res.data);
      setPopup("");
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
