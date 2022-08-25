import React, { useContext, useEffect, useState } from "react";
import VideoPathContext from "../../Contexts/VideoPathContext";
import PopupContext from "../../Contexts/PopupContext";
import styles from "./style.module.css";
import PlayLists from "../PlayLists";
import UserContext from "../../Contexts/UserContext";
import SongContext from "../../Contexts/SongContext";
import "../../style/style.css";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../Contexts/MessageContext";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
// const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function Song(props) {
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  const [user, setUser] = useContext(UserContext);
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const [popup, setPopup] = useContext(PopupContext);
  // const [songIsPlaying, setSongIsPlaying] = useState(false);
  const [showStop, setShowStop] = useState(false);
  const addToPlayList = require("../../assets/images/addToPlaylist.png");
  const removeFromPlayList = require("../../assets/images/delete.png");
  const playButton = require("../../assets/images/playButton.png");
  const stopButton = require("../../assets/images/stopButton.png");
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );
  const navigate = useNavigate();
  const [message, setMessage] = useContext(MessageContext);

  useEffect(() => {
    if (currentSong && currentSong.songId === props.songId) {
      setShowStop(true);
    } else {
      setShowStop(false);
    }
  }, [currentSong]);

  const playSong = async (e) => {
    e.preventDefault();
    // setSongIsPlaying(!songIsPlaying);
    if (showStop) {
      setVideoFilePath("");
      setCurrentSong(null);
    } else {
      setVideoFilePath(props.videoUrl);
      setCurrentSong({
        songId: props.songId,
        videoUrl: props.videoUrl,
        imgUrl: props.imgUrl,
        title: props.title,
      });
      //update song mark
      if (props.delete) {
        const config = {
          method: "post",
          url: `${baseUrl}/playlist/updateSongMark/`,
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
            setMessage("");
            setUser(res.data.user);
            setSelectedPlaylist(res.data.selectedPlaylist[0]);
          })
          .catch((err) => {
            if (!(err.response.status >= 400 && err.response.status < 499)) {
              setMessage("Error occured, try again later");
            } else {
              setMessage(`Session ended or user not found
             try signin again`);
              console.log(err.response.data);
              setUser("");
              navigate("/login");
            }
          });
      }
    }
  };

  const addSongToPlaylist = () => {
    setCurrentSong({
      songId: props.songId,
      videoUrl: props.videoUrl,
      imgUrl: props.imgUrl,
      title: props.title,
    });

    setPopup(<PlayLists showNewButton={true} source="search" />);
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
        setMessage("");
        setUser(res.data.user);
        setSelectedPlaylist(res.data.selectedPlaylist[0]);
      })
      .catch((err) => {
        if (!(err.response.status >= 400 && err.response.status < 499)) {
          setMessage("Error occured, try again later");
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
    <div className={styles.songDetails}>
      <img src={props.imgUrl} className={styles.songImg} />
      {/* <div className={styles.songDetails}> */}
      <span className={styles.songName}>{props.title}</span>
      <div className={styles.btnPannel}>
        {!props.delete ? (
          <>
            <div className={styles.tooltip}>
              <img
                src={showStop ? stopButton : playButton}
                className={styles.icon}
                onClick={(e) => playSong(e)}
              />
              <div className={styles.tooltipContent}>
                {showStop ? "Stop playing" : "Play song"}
              </div>
            </div>
            <div className={styles.tooltip}>
              <img
                src={addToPlayList}
                className={styles.icon}
                onClick={addSongToPlaylist}
              />
              <div className={styles.tooltipContent}>Add to playlist</div>
            </div>
          </>
        ) : (
          <>
            <div>Song Mark: {props.songMark}</div>
            <div className={styles.tooltip}>
              <img
                src={showStop ? stopButton : playButton}
                className={styles.icon}
                onClick={(e) => playSong(e)}
              />
              <div className={styles.tooltipContent}>
                {showStop ? "Stop playing" : "Play song"}
              </div>
            </div>
            <div className={styles.tooltip}>
              <img
                src={removeFromPlayList}
                className={styles.icon}
                onClick={removeSongFromPlaylist}
              />
              <div className={styles.tooltipContent}>Remove from playlist</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
