export default function Song(props) {
  return (
    <>
      <video src={"https://www.youtube.com/watch?v=" + props.video_id}></video>
    </>
  );
}
