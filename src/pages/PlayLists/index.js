import { useContext } from "react";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import PlayList from "../../components/PlayList";
import NewPlaylist from "../NewPlayList";
import "../../style/style.css";

export default function PlayLists() {
  //use popupcontext and fill with user's lists
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);

  const newPlayList = (e) => {
    setPopup(<NewPlaylist email={user.email} />);
  };

  return (
    <div className="container">
      <button onClick={newPlayList} className="button">
        New Playlist
      </button>
      {user && user.playlists && user.playlists.length > 0 ? (
        <ul>
          {user.playlists.map((playlist) => (
            <li>
              <PlayList key={playlist.id} {...playlist} />
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
