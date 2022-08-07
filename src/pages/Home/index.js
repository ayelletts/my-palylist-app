import Search from "../Search";
import styles from "./style.module.css";
import PlayLists from "../PlayLists";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import Songs from "../../components/Songs";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";
import VideoPathContext from "../../Contexts/VideoPathContext";
import ReactPlayer from "react-player";

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  const [showSongs, setShowSongs] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);

  useEffect(() => {
    selectedPlaylist ? setShowSongs(true) : setShowSongs(false);
  }, [selectedPlaylist, user]);

  return (
    <div className={styles.playlistsAndSongs}>
      <div className={styles.homePlayer}>
        <div className={styles.playlistsDiv}>
          <h3>Your PlayLists</h3>
          <PlayLists />
          {/* <Nav /> */}
        </div>
        <div id="songPlayer" className={styles.songPlayer}>
          Play clips here...
          <ReactPlayer
            url={videoFilePath}
            width="55vh"
            height="40vh"
            controls={true}
            float="right"
          />
        </div>
      </div>
      {showSongs && (
        <div className={styles.songsDiv}>
          <div className={styles.plTitle}>{selectedPlaylist.title}</div>
          <Songs songs={selectedPlaylist.songs} delete={true} />
        </div>
      )}
    </div>
  );
}

// function Nav() {
//   return (
//     <nav>
//       <Search />
//     </nav>
//   );
// }
