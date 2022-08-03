import Songs from "../../components/Songs";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoPathContext from "../../Contexts/VideoPathContext";
import PopupContext from "../../Contexts/PopupContext";
import Popup from "../../components/Popup";
import SongContext from "../../Contexts/SongContext";
import styles from "./style.module.css";
import "../../style/style.css";
import SearchInput from "../../components/SearchInput";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [resultClips, setResultClips] = useState([]);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const popup = useState("");
  const currentSong = useState([]);

  useEffect(() => {
    if (!searchText) return;
    //alert("in use effect");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8b473cc555msh32d4a424a6edbb5p1f18f8jsnbf112e1f234a",
        "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
      },
    };

    fetch(
      "https://simple-youtube-search.p.rapidapi.com/search?query=" + searchText,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        let clips = [];
        let song = "";
        console.log(response.results);
        for (song of response.results) {
          clips.push({
            songId: song.id,
            videoUrl: song.url,
            imgUrl: song.thumbnail.url,
            title: song.title,
          });
        }
        setResultClips(response.results);
      })
      .catch((err) => console.error(err));
  }, [searchText]);

  return (
    <div className="container">
      <SearchInput searchState={setSearchText} />
      <div className={styles.searchLayout}>
        <div id="songsDiv" className={styles.songsDiv}>
          Search results here...
          <SongContext.Provider value={currentSong}>
            <PopupContext.Provider value={popup}>
              <VideoPathContext.Provider
                value={[videoFilePath, setVideoFilePath]}
              >
                <Songs songs={resultClips} showImgAndBtns={true} />
                <Popup />
              </VideoPathContext.Provider>
            </PopupContext.Provider>
          </SongContext.Provider>
        </div>
        <div id="songPlayer" className={styles.songPlayer}>
          Play clips here...
          <ReactPlayer
            url={videoFilePath}
            width="500px"
            height="350px"
            controls={true}
            float="right"
          />
        </div>
      </div>
    </div>
  );
}
