import SearchInput from "../components/SearchInput";
import Songs from "../components/Songs";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoPathContext from "../Contexts/VideoPathContext";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [resultClips, setResultClips] = useState([]);
  const [videoFilePath, setVideoFilePath] = useState(null);

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
        console.log(response.results);
        setResultClips(response.results);
      })
      .catch((err) => console.error(err));
  }, [searchText]);

  return (
    <>
      <SearchInput searchState={setSearchText} />
      <div className="search-layout">
        <div id="songsDiv">
          <VideoPathContext.Provider value={[videoFilePath, setVideoFilePath]}>
            <Songs songs={resultClips} />
          </VideoPathContext.Provider>
        </div>
        <div id="songPlayer">
          <ReactPlayer
            url={videoFilePath}
            width="500px"
            height="350px"
            controls={true}
            float="right"
          />
        </div>
      </div>
    </>
  );
}
