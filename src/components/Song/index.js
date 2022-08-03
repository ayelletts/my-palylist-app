import React, { useContext, useState } from "react";
import VideoPathContext from "../../Contexts/VideoPathContext";
import PopupContext from "../../Contexts/PopupContext";
import styles from "./style.module.css";
import PlayLists from "../../pages/PlayLists";
import UserContext from "../../Contexts/UserContext";
import SongContext from "../../Contexts/SongContext";
import "../../style/style.css";

export default function Song(props) {
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  const [user, setUser] = useContext(UserContext);
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const [popup, setPopup] = useContext(PopupContext);
  const [songIsPlaying, setSongIsPlaying] = useState(false);
  const addToPlayList = require("../../assets/images/addToPlaylist.png");
  const playButton = require("../../assets/images/playButton.png");
  const stopButton = require("../../assets/images/stopButton.png");

  const playSong = () => {
    setSongIsPlaying(!songIsPlaying);
    if (songIsPlaying) setVideoFilePath("");
    else setVideoFilePath(props.url);
  };

  const addSongToPlaylist = () => {
    setCurrentSong({
      songId: props.id,
      videoUrl: props.url,
      imgUrl: props.thumbnail.url,
      title: props.title,
    });
    //if (!user.playlists || user.playlists.length === 0) {

    setPopup(<PlayLists />);
    //}
  };

  return (
    <div className={styles.songDetails}>
      {props.showImgAndBtns && (
        <img src={props.thumbnail.url} className={styles.songImg} />
      )}
      {/* <div className={styles.songDetails}> */}
      <span>{props.title}</span>
      {props.showImgAndBtns && (
        <div className={styles.btnPannel}>
          <img
            src={songIsPlaying ? stopButton : playButton}
            className={styles.icon}
            onClick={() => playSong()}
          />
          <img
            src={addToPlayList}
            className={styles.icon}
            onClick={() => addSongToPlaylist()}
            alt="Add to Playlist"
          />
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
