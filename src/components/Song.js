export default function Song(props) {
  return (
    <>
      <video src={"http://www.youtube.com/watch?v=" + props.video_id}></video>
    </>
  );
}
