import Songs from "../../components/Songs";
import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoPathContext from "../../Contexts/VideoPathContext";
import styles from "./style.module.css";
import "../../style/style.css";
import SearchInput from "../../components/SearchInput";
import MessageContext from "../../Contexts/MessageContext";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [resultClips, setResultClips] = useState([]);
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  const [message, setMessage] = useContext(MessageContext);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
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
        setMessage("");
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
            width="80vh"
            height="50vh"
            controls={true}
            float="right"
            playing={videoFilePath === "" ? false : true}
          />
        </div>
      </div>
    </div>
  );
}
