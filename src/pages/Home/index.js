import Search from "../Search";
import styles from "./style.module.css";
import PlayLists from "../PlayLists";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import Songs from "../../components/Songs";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  const [showSongs, setShowSongs] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );

  useEffect(() => {
    selectedPlaylist ? setShowSongs(true) : setShowSongs(false);
  }, [selectedPlaylist, user]);

  return (
    <div>
      <div className={styles.playlistsDiv}>
        <h3>Your PlayLists</h3>
        <PlayLists />
        {/* <Nav /> */}
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
