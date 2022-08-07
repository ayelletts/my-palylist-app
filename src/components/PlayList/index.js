import { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import SongContext from "../../Contexts/SongContext";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";

// const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function PlayList(props) {
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);
  const [isClassSelected, setIsClassSelected] = useState(false);

  useEffect(() => {
    if (selectedPlaylist && props && currentSong == "") {
      if (selectedPlaylist._id === props._id) {
        setIsClassSelected(true);
      } else {
        setIsClassSelected(false);
      }
    }
  }, [selectedPlaylist]);

  const selectList = async (e) => {
    if (currentSong != "") {
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
      await axios(config).then((res) => {
        setUser(res.data);
        setPopup("");
      });
      setCurrentSong("");
      setSelectedPlaylist(null);
    } // come from home page
    else {
      setSelectedPlaylist(props);
    }
  };
  return (
    <div className={styles.liDiv}>
      <img src={props.imgUrlPl} className={styles.plImg} />
      <h5
        onClick={selectList}
        className={
          isClassSelected ? styles.selectedList : styles.unselectedList
        }
      >
        {props.title}
      </h5>
    </div>
  );
}
