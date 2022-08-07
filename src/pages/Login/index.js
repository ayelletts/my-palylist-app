import { useContext, useRef, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useContext(UserContext);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [showMessage, setShowMessage] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    //update user context
    //validate user - מול הקונטקסט
    //goto playlists page
    // if (user.username === e.target.elements.userName.value) {
    //   console.log("approved");
    // }
  };

  const signup = (e) => {
    navigate("/users/signup");
  };

  const login = async () => {
    axios
      .post("http://localhost:3000/users/login/", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        setShowMessage(false);
        setUser(res.data.user);
        navigate("/myList");
        //navigate("/search");
      })
      .catch((err) => {
        setErrMsg(err.response.data);
        setShowMessage(true);
      });
  };

  return (
    <div className="Auth-form-container" onSubmit={onSubmit}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              ref={emailRef}
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              ref={passwordRef}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3 center">
            <button type="submit" className="btn button" onClick={login}>
              Submit
            </button>
          </div>
          {showMessage && <div className="text-danger">{errMsg}</div>}
          <p className="forgot-password text-right mt-2">
            New user?{" "}
            <a href="#" onClick={signup}>
              Signup
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
