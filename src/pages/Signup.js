import { useContext, useRef, useState } from "react";
import UserContext from "../Contexts/UserContext";
import axios from "axios";

export default function Signup() {
  const [user, setUser] = useContext(UserContext);
  const [formData, setFormData] = useState({});

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
    axios.post("http://localhost:3000/users/signup/", formData).then((res) => {
      //מה חוזר אחרי רישום? localStorage.setItem("token", res.data);
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
            <label>Address</label>
            <input
              name="address"
              className="form-control mt-1"
              placeholder="Enter address"
              onChange={onChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={signup}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
