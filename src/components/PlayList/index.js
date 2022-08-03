import { useContext, useState } from "react";
import Songs from "../Songs";
import styles from "./style.module.css";
import axios from "axios";
import SongContext from "../../Contexts/SongContext";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";

export default function PlayList(props) {
  const [showSongs, setShowSongs] = useState(false);
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);

  const selectList = async (e) => {
    //setShowSongs(!showSongs);
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
  };
  return (
    <div className={styles.liDiv}>
      <h5 onClick={selectList}>{props.title}</h5>
      <img src={props.imgUrlPl} className={styles.plImg} />
      {showSongs && <Songs songs={props.songs} showImgAndBtns={false} />}
    </div>
  );
}
