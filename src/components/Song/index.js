import React, { useContext, useState } from "react";
import VideoPathContext from "../../Contexts/VideoPathContext";
import PopupContext from "../../Contexts/PopupContext";
import styles from "./style.module.css";
import PlayLists from "../../pages/PlayLists";
import UserContext from "../../Contexts/UserContext";
import SongContext from "../../Contexts/SongContext";
import "../../style/style.css";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";
import axios from "axios";
// const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function Song(props) {
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  const [user, setUser] = useContext(UserContext);
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const [popup, setPopup] = useContext(PopupContext);
  const [songIsPlaying, setSongIsPlaying] = useState(false);
  const addToPlayList = require("../../assets/images/addToPlaylist.png");
  const removeFromPlayList = require("../../assets/images/delete.png");
  const playButton = require("../../assets/images/playButton.png");
  const stopButton = require("../../assets/images/stopButton.png");
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );
  const playSong = () => {
    setSongIsPlaying(!songIsPlaying);
    if (songIsPlaying) setVideoFilePath("");
    else setVideoFilePath(props.videoUrl);
  };

  const addSongToPlaylist = () => {
    setCurrentSong({
      songId: props.songId,
      videoUrl: props.videoUrl,
      imgUrl: props.imgUrl,
      title: props.title,
    });
    //if (!user.playlists || user.playlists.length === 0) {

    setPopup(<PlayLists showNewButton={true} />);
    //}
  };

  const removeSongFromPlaylist = async (e) => {
    const config = {
      method: "delete",
      url: `${baseUrl}/playlist/deleteSong/`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        userId: selectedPlaylist.userId,
        playlistId: selectedPlaylist._id,
        songId: props._id,
      },
    };
    await axios(config)
      .then((res) => {
        setUser(res.data.user);
        setSelectedPlaylist(res.data.selectedPlaylist[0]);
      })
      .catch((err) => {});
  };

  return (
    <div className={styles.songDetails}>
      <img src={props.imgUrl} className={styles.songImg} />
      {/* <div className={styles.songDetails}> */}
      <span className={styles.songName}>{props.title}</span>
      <div className={styles.btnPannel}>
        {!props.delete ? (
          <>
            <div className={styles.tooltip}>
              <img
                src={songIsPlaying ? stopButton : playButton}
                className={styles.icon}
                onClick={() => playSong()}
              />
              <div className={styles.tooltipContent}>Play song</div>
            </div>
            <div className={styles.tooltip}>
              <img
                src={addToPlayList}
                className={styles.icon}
                onClick={addSongToPlaylist}
                alt="Add to Playlist"
              />
              <div className={styles.tooltipContent}>Add to playlist</div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.tooltip}>
              <img
                src={songIsPlaying ? stopButton : playButton}
                className={styles.icon}
                onClick={() => playSong()}
              />
              <div className={styles.tooltipContent}>Play song</div>
            </div>
            <div className={styles.tooltip}>
              <img
                src={removeFromPlayList}
                className={styles.icon}
                onClick={removeSongFromPlaylist}
                alt="Add to Playlist"
              />
              <div className={styles.tooltipContent}>Remove from playlist</div>
            </div>
          </>
        )}
      </div>
      {/* </div> */}
    </div>
  );
}
