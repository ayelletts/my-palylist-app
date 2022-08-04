import Songs from "../../components/Songs";
import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoPathContext from "../../Contexts/VideoPathContext";
import styles from "./style.module.css";
import "../../style/style.css";
import SearchInput from "../../components/SearchInput";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [resultClips, setResultClips] = useState([]);
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  let clips = [];

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
        setResultClips(clips);
      })
      .catch((err) => console.error(err));
  }, [searchText]);

  return (
    <div className="container">
      <SearchInput searchState={setSearchText} />
      <div className={styles.searchLayout}>
        <div id="songsDiv" className={styles.songsDiv}>
          Search results here...
          <Songs songs={resultClips} />
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
