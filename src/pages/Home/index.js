import Search from "../Search";
import styles from "./style.module.css";
import PlayLists from "../PlayLists";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import Songs from "../../components/Songs";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";
import VideoPathContext from "../../Contexts/VideoPathContext";
import ReactPlayer from "react-player";
import SongContext from "../../Contexts/SongContext";

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  const [checked, setChecked] = useState(false);
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const videoRef = useRef();

  useEffect(() => {
    if (selectedPlaylist) {
      setShowSongs(true);
      setShowMessage(false);
    } else {
      setShowSongs(false);
    }
  }, [selectedPlaylist, user]);

  useEffect(() => {
    if (videoFilePath) {
      setShowMessage(false);
      if (typeof videoFilePath == "string") {
        // videoFilePath is a single song - come from Song Component - remove play entire playlist ckecked
        if (checked) setChecked(false);
      }
    }
  }, [videoFilePath]);

  const autoPlay = (e) => {
    if (selectedPlaylist) {
      setChecked(e.target.checked);
      if (e.target.checked) {
        const arrayOfUrl = [];

        for (let song of selectedPlaylist.songs) {
          arrayOfUrl.push(song.videoUrl);
        }
        setVideoFilePath(arrayOfUrl);
        setCurrentSong(selectedPlaylist.songs[0]);
      } else {
        setVideoFilePath("");
        setCurrentSong(null);
      }
    } else {
      setMessage("No playlist selected...");
      setShowMessage(true);
    }
  };

  const onVideoBufferingEnd = () => {
    if (
      videoRef.current.getCurrentTime() >= 0 &&
      videoRef.current.getCurrentTime() < 1
    ) {
      setCurrentSong(selectedPlaylist.songs[getNextSongIndex()]);
    }
  };

  function getNextSongIndex() {
    let retInd = 0;
    if (currentSong == null) return retInd;
    for (let songInd in selectedPlaylist.songs) {
      if (selectedPlaylist.songs[songInd].songId === currentSong.songId) {
        if (songInd === selectedPlaylist.songs.length - 1) {
          retInd = 0;
        }
        retInd = Number(songInd) + 1;
      }
    }
    return retInd;
  }
  return (
    <div className={styles.playlistsAndSongs}>
      <div className={styles.homePlayer}>
        <div className={styles.playlistsDiv}>
          <h3>Your PlayLists</h3>
          <PlayLists />
          {/* <Nav /> */}
        </div>
        <div id="songPlayer" className={styles.songPlayer}>
          <label>
            <input type="checkbox" checked={checked} onChange={autoPlay} />
            {"  "} Play entire playlist
          </label>
          {showMessage && (
            <span className="error">
              <br />
              {message}
            </span>
          )}
          <ReactPlayer
            url={videoFilePath}
            width="55vh"
            height="40vh"
            controls={true}
            float="right"
            playing={videoFilePath === "" ? false : true}
            onBufferEnd={onVideoBufferingEnd}
            ref={videoRef}
          />
        </div>
      </div>
      {showSongs && (
        <div className={styles.songsDiv}>
          <div className={styles.plTitle}>{selectedPlaylist.title}</div>
          <Songs
            songs={selectedPlaylist.songs}
            delete={true}
            playAll={checked}
          />
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
