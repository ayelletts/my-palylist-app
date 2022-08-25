import { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import SongContext from "../../Contexts/SongContext";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";
import SharePlaylist from "../SharePlaylist";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../Contexts/MessageContext";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";
// const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function PlayList(props) {
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);
  const [isClassSelected, setIsClassSelected] = useState(false);
  const deletePlayList = require("../../assets/images/delete.png");
  const shareButton = require("../../assets/images/share.png");
  const navigate = useNavigate();
  const [message, setMessage] = useContext(MessageContext);

  useEffect(() => {
    if (selectedPlaylist && props && currentSong == null) {
      if (selectedPlaylist._id === props._id) {
        setIsClassSelected(true);
      } else {
        setIsClassSelected(false);
      }
    }
  }, [selectedPlaylist]);

  const selectList = async (e) => {
    if (props.source === "search") {
      // come from add song to play list
      const config = {
        method: "post",
        url: `${baseUrl}/playlist/addToList/`,
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          email: user.email,
          listId: props._id,
          song: currentSong,
        },
      };
      await axios(config)
        .then((res) => {
          setMessage("");
          setUser(res.data);
          setPopup("");
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
      setCurrentSong(null);
      setSelectedPlaylist(null);
    } else {
      // come from home page
      setSelectedPlaylist(props);
    }
  };
  const shareList = () => {
    setPopup(<SharePlaylist {...props} />);
  };

  const deletePlaylistFromDB = async (e) => {
    const config = {
      method: "delete",
      url: `${baseUrl}/playlist/deletePlaylist/`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        userId: props.userId,
        playlistId: props._id,
      },
    };
    await axios(config)
      .then((res) => {
        setMessage("");
        setUser(res.data.user);
        setSelectedPlaylist(null);
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
    <div className={styles.liDiv}>
      <div className={styles.plTitle}>
        <img src={props.imgUrlPl} className={styles.plImg} />
        <div
          onClick={selectList}
          className={
            isClassSelected ? styles.selectedList : styles.unselectedList
          }
        >
          {props.title}
        </div>
        <span className={styles.listMark}>
          List Mark: <br />
          {props.listMark}
        </span>
      </div>
      <div className={styles.tooltip}>
        <img src={shareButton} className={styles.icon} onClick={shareList} />
        <div className={styles.tooltipContent}>Share playlist</div>
      </div>
      <div className={styles.tooltip}>
        <img
          src={deletePlayList}
          className={styles.icon}
          onClick={deletePlaylistFromDB}
        />
        <div className={styles.tooltipContent}>Delete playlist</div>
      </div>
    </div>
  );
}
