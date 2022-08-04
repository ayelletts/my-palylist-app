import { useContext } from "react";
import styles from "./style.module.css";
import axios from "axios";
import SongContext from "../../Contexts/SongContext";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";

export default function PlayList(props) {
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);

  const selectList = async (e) => {
    if (currentSong != "") {
      // come from add song to play list
      const config = {
        method: "post",
        url: "http://localhost:3000/playlist/addToList/",
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
    } // come from home page
    else {
      setSelectedPlaylist(props);
    }
  };
  return (
    <div className={styles.liDiv}>
      <img src={props.imgUrlPl} className={styles.plImg} />
      <h5 onClick={selectList} className={styles.unselectedList}>
        {props.title}
      </h5>
    </div>
  );
}
