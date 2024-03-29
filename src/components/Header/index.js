import appIcon from "../../assets/images/appIcon.png";
import styles from "./style.module.css";
import UserContext from "../../Contexts/UserContext";
import { useContext } from "react";
import userIcon from "../../assets/images/user.png";
import searchIcon from "../../assets/images/search.png";
import exitIcon from "../../assets/images/exit.png";
import { useNavigate } from "react-router-dom";
import VideoPathContext from "../../Contexts/VideoPathContext";

export default function Header(props) {
  const user = useContext(UserContext);
  const [videoFilePath, setVideoFilePath] = useContext(VideoPathContext);
  const navigate = useNavigate();

  return (
    <div className={styles.divHeader}>
      <h1>My Spotify App</h1>
      <img className={styles.imgHeader} src={appIcon}></img>
      <div className={styles.nav}>
        <span className={styles.name}>
          {" "}
          Hello, {user[0] ? user[0].name : "Guest"}
        </span>
        <div className={styles.tooltip}>
          <img
            src={searchIcon}
            className={styles.icon}
            onClick={() => {
              setVideoFilePath("");
              navigate("/search");
            }}
          />
          <div className={styles.tooltipContent}>Search for new music</div>
        </div>
        <div className={styles.tooltip}>
          <img
            src={userIcon}
            className={styles.icon}
            onClick={() => navigate("/myList")}
          />
          <div className={styles.tooltipContent}>My home page</div>
        </div>
        <div className={styles.tooltip}>
          <img
            src={exitIcon}
            className={styles.icon}
            onClick={() => {
              localStorage.setItem("token", "");
              {
                user[1](null);
              }
              navigate("/login");
            }}
          />
          <div className={styles.tooltipContent}>Signout</div>
        </div>
      </div>
    </div>
  );
}
