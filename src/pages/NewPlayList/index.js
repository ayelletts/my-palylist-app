import { useContext, useRef } from "react";
import axios from "axios";
import SongContext from "../../Contexts/SongContext";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import "../../style/style.css";

export default function NewPlaylist(props) {
  const currentSong = useContext(SongContext);
  const playlistNameRef = useRef("");
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);

  const createPlaylist = async (e) => {
    const config = {
      method: "post",
      url: "http://localhost:3000/playlist/new/",
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
