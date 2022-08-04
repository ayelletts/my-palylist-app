import { useContext } from "react";
import PopupContext from "../../Contexts/PopupContext";
import "./style.css";
import closeIcon from "../../assets/images/cancel.png";

export default function Popup() {
  const [popup, setPopup] = useContext(PopupContext);

  return (
    <div className={`overlay ${popup ? "" : "close"}`}>
      <div className="popup">
        <img src={closeIcon} className="icon" onClick={() => setPopup("")} />
        {popup}
      </div>
    </div>
  );
}
