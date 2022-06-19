import SearchInput from "../components/SearchInput";
import Songs from "../components/Songs";
import { useEffect } from "react";
import { useState } from "react";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [resultClips, setResultClips] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "VdLyyNxGgwAE5XTPyE5rMtHhilcZnvvy",
        "X-RapidAPI-Host": "youtube-search6.p.rapidapi.com",
      },
    };

    fetch(
      "https://youtube-search6.p.rapidapi.com/search/?query=" + searchText,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.videos);
        setResultClips(response.videos);
      })
      .catch((err) => console.error(err));
  }, [searchText]);

  return (
    <>
      <SearchInput searchState={setSearchText} />
      <Songs songs={resultClips} />
    </>
  );
}
