import { useContext } from "react";
import UserContext from "../Contexts/UserContext";

export default function Login() {
  const [user, setUser] = useContext(UserContext);

  const onSubmit = (e) => {
    e.preventDefault();
    //update user context
    //validate user - מול הקונטקסט
    //goto playlists page
    if (user.username === e.target.elements.userName.value) {
      console.log("approved");
    }
  };

  const login = async () => {
    axios
      .post("http://localhost:3000/login/", {
        email: "email",
        password: "password",
      })
      .then((res) => {
        localStorage.setItem("token", res.data);
      });
  };
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <form onSubmit={onSubmit}>
      <input id="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter password" />
      <button onClick={login}>Login</button>
    </form>
  );
}
