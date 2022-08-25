import styles from "./style.module.css";
import PlayLists from "../../components/PlayLists";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import Songs from "../../components/Songs";
import SelectedPlaylistContext from "../../Contexts/SelectedPlaylistContext";
import VideoPathContext from "../../Contexts/VideoPathContext";
import ReactPlayer from "react-player";
import SongContext from "../../Contexts/SongContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../Contexts/MessageContext";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
// const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useContext(MessageContext);
  const [showSongs, setShowSongs] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useContext(
    SelectedPlaylistContext
  );
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  const [currentSong, setCurrentSong] = useContext(SongContext);
  const videoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setMessage("");

    if (selectedPlaylist) {
      setShowSongs(true);
    } else {
      setShowSongs(false);
    }
  }, [selectedPlaylist, user]);

  useEffect(() => {
    if (videoFilePath) {
      setMessage("");
      if (typeof videoFilePath == "string") {
        // videoFilePath is a single song - come from Song Component - remove play entire playlist ckecked
        if (checked) setChecked(false);
      }
    }
  }, [videoFilePath]);

  const autoPlay = async (e) => {
    if (selectedPlaylist) {
      setChecked(e.target.checked);
      if (!checked) {
        const arrayOfUrl = [];

        for (let song of selectedPlaylist.songs) {
          arrayOfUrl.push(song.videoUrl);
        }
        setVideoFilePath(arrayOfUrl);
        setCurrentSong(selectedPlaylist.songs[0]);
        //update list mark
        const config = {
          method: "post",
          url: `${baseUrl}/playlist/updateListMark/`,
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            userId: selectedPlaylist.userId,
            playlistId: selectedPlaylist._id,
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
      } else {
        setVideoFilePath("");
        setCurrentSong(null);
      }
    } else {
      setVideoFilePath("");
      setCurrentSong(null);
      setMessage("No playlist selected...");
    }
  };

  const onVideoBuffering = () => {
    if (checked) {
      let remainTime =
        videoRef.current.getDuration() - videoRef.current.getCurrentTime();
      if (remainTime + 0.5 >= videoRef.current.getDuration()) {
        setCurrentSong(selectedPlaylist.songs[getNextSongIndex()]);
      }
    }
  };

  function getNextSongIndex() {
    let retInd = -1;
    if (currentSong == null) return retInd;
    for (let songInd in selectedPlaylist.songs) {
      if (selectedPlaylist.songs[songInd].songId === currentSong.songId) {
        if (songInd == selectedPlaylist.songs.length - 1) {
          return 0;
        } else {
          return Number(songInd) + 1;
        }
      }
    }
    // return retInd;
  }

  return (
    <div className={styles.playlistsAndSongs}>
      <div className={styles.homePlayer}>
        <div className={styles.playlistsDiv}>
          <h3>Your PlayLists</h3>
          <PlayLists source="home" />
        </div>
        <div id="songPlayer" className={styles.songPlayer}>
          <label>
            <input type="checkbox" checked={checked} onChange={autoPlay} />
            {"  "} Play entire playlist
          </label>
          <ReactPlayer
            url={videoFilePath}
            width="85vh"
            height="40vh"
            controls={true}
            float="right"
            playing={videoFilePath === "" ? false : true}
            onBuffer={checked ? onVideoBuffering : null}
            ref={videoRef}
          />
        </div>
      </div>
      {showSongs && selectedPlaylist && (
        <div className={styles.songsDiv}>
          <div className={styles.plTitle}>{selectedPlaylist.title}</div>
          <Songs
            songs={selectedPlaylist.songs}
            delete={true}
            playAll={setChecked}
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
