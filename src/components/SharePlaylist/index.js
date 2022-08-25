import { useContext, useRef, useState } from "react";
import axios from "axios";
import SongContext from "../../Contexts/SongContext";
import PopupContext from "../../Contexts/PopupContext";
import UserContext from "../../Contexts/UserContext";
import "../../style/style.css";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../Contexts/MessageContext";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
// const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function SharePlaylist(props) {
  const shareWithEmailRef = useRef("");
  const [popup, setPopup] = useContext(PopupContext);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useContext(MessageContext);

  const sharePlaylist = async (e) => {
    const config = {
      method: "post",
      url: `${baseUrl}/playlist/share/`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        email: user.email,
        shareWithEmail: shareWithEmailRef.current.value,
        imgUrl: props.imgUrlPl,
        title: props.title,
        listMark: 0,
        songs: props.songs,
      },
    };
    await axios(config)
      .then((res) => {
        setMessage("");
        setPopup("");
      })
      .catch((err) => {
        setPopup("");

        if (!(err.response.status >= 400 && err.response.status < 499)) {
          if (err.response.status === 506 || err.response.status === 507)
            setMessage(err.response.data);
          else {
            setMessage("Error occured, try again later");
          }
        } else {
          setMessage(`Session ended or user not found
             try signin again`);
          console.log(err.response.data);
          setUser("");
          navigate("/login");
        }
      });
  };
  return (
    <>
      <input
        placeholder="Email to share with..."
        type="text"
        ref={shareWithEmailRef}
        className="input"
      />
      <button onClick={sharePlaylist} className="button">
        Share playList
      </button>
    </>
  );
}
