import { useContext, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../Contexts/MessageContext";
// const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const baseUrl = process.env.BASE_URL || "https://my-spotify-ah.herokuapp.com";

export default function Signup() {
  const [user, setUser] = useContext(UserContext);
  const [formData, setFormData] = useState({});
  let navigate = useNavigate();
  const [message, setMessage] = useContext(MessageContext);

  const onSubmit = (e) => {
    e.preventDefault();
    //update user context
    //validate user - מול הקונטקסט
    //goto playlists page
    // if (user.username === e.target.elements.userName.value) {
    //   console.log("approved");
    // }
  };

  const signup = async () => {
    formData.address = {
      street: formData.street,
      homeNum: formData.homeNumber,
      city: formData.city,
    };
    // delete formData["street"];
    // delete formData["homeNumber"];
    // delete formData["city"];
    axios
      .post(`${baseUrl}/users/signup/`, formData)
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

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((currentFormData) => {
      return {
        ...currentFormData,
        [name]: value,
      };
    });
  };
  return (
    <div className="Auth-form-container" onSubmit={onSubmit}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              name="firstName"
              className="form-control mt-1"
              placeholder="Enter first name"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              name="lastName"
              className="form-control mt-1"
              placeholder="Enter last name"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Gender</label>
            <input
              name="gender"
              className="form-control mt-1"
              placeholder="Enter gender"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Street</label>
            <input
              name="street"
              className="form-control mt-1"
              placeholder="Enter street"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Home Number</label>
            <input
              name="homeNumber"
              className="form-control mt-1"
              placeholder="Enter home number"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>City</label>
            <input
              name="city"
              className="form-control mt-1"
              placeholder="Enter city"
              onChange={onChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3 center">
            <button type="submit" className="btn button" onClick={signup}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
