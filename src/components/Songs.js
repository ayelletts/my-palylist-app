import Song from "./Song";

export default function Songs(props) {
  const { songs } = props;
  return (
    <ul>
      {songs.map((song) => (
        <li>
          <Song key={song.id} {...song} />
        </li>
      ))}
    </ul>
  );
}
