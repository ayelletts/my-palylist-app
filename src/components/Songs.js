import Song from "./Song";

export default function Songs(props) {
  const { songs } = props;
  return (
    <ul>
      <li>
        {songs.map((song) => (
          <Song key={song.video_id} {...song} />
        ))}
      </li>
    </ul>
  );
}
