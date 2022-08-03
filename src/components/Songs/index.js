import Song from "../Song";
import "./style.module.css";

export default function Songs(props) {
  const { songs } = props;

  return (
    <ul>
      {songs.map((song) => (
        <li>
          <Song
            key={song.songId}
            {...song}
            showImgAndBtns={props.showImgAndBtns}
          />
        </li>
      ))}
    </ul>
  );
}
