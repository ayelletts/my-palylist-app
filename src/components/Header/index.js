import appIcon from "../../assets/images/appIcon.png";
import styles from "./style.module.css";

export default function Header() {
  return (
    <div className={styles.divHeader}>
      <h1>My Spotify App</h1>
      <img className={styles.imgHeader} src={appIcon}></img>
    </div>
  );
}
