import { useContext, useRef, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../Contexts/MessageContext";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
// const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function Login() {
  const [user, setUser] = useContext(UserContext);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [message, setMessage] = useContext(MessageContext);

  const navigate = useNavigate();

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
      .post(`${baseUrl}/users/login/`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        setMessage("");
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/myList");
      })
      .catch((err) => {
        if (!(err.response.status >= 400 && err.response.status < 499)) {
          setMessage("Error occured, try again later");
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
