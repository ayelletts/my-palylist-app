import { useContext } from "react";
import PopupContext from "../../Contexts/PopupContext";
import "./style.css";

export default function Popup() {
  const [popup, setPopup] = useContext(PopupContext);

  return (
    <div className={`overlay ${popup ? "" : "close"}`}>
      <div className="popup">{popup}</div>
    </div>
  );
}
