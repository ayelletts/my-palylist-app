export default function Song(props) {
  return (
    <>
      <video src={"https://www.youtube.com/watch?v=" + props.id}></video>
      <h2>
        <strong> {props.title}</strong>
      </h2>
      {/* <span> {props.description}</span> */}
    </>
  );
}
