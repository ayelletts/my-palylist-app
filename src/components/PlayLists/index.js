import { useContext } from "react";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import PlayList from "../PlayList";
import NewPlaylist from "../NewPlayList";
import "../../style/style.css";
import styles from "./style.module.css";

export default function PlayLists(props) {
  //use popupcontext and fill with user's lists
  const [user, setUser] = useContext(UserContext);
  const [popup, setPopup] = useContext(PopupContext);

  const newPlayList = (e) => {
    setPopup(<NewPlaylist email={user.email} />);
  };

  return (
    <div className={styles.plDiv}>
      {props.showNewButton && (
        <button onClick={newPlayList} className="button">
          New Playlist
        </button>
      )}
      {user && user.playlists && user.playlists.length > 0 ? (
        <ul>
          {user.playlists.map((playlist) => (
            <li>
              <PlayList key={playlist.id} {...playlist} source={props.source} />
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
