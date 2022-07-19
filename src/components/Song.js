import React, { useContext } from "react";
import VideoPathContext from "../Contexts/VideoPathContext";
import "../style/style.css";

export default function Song(props) {
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  const playSong = () => {
    setVideoFilePath(props.url);
  };

  const addSongToPlaylist = () => {
    alert("add song to playlist: " + props.id);
  };

  return (
    <div className="song-comp">
      <img src={props.thumbnail.url} className="song-img" />
      <div className="song-details">
        <span>{props.title}</span>
        <div className="btn-pannel">
          <button id="playSong" onClick={() => playSong()}>
            Play Me
          </button>
          <button id="addSongToPlaylist" onClick={() => addSongToPlaylist()}>
            Add To Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
