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

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <form onSubmit={onSubmit}>
      <input id="userName" placeholder="Enter user name" />
      {/* <input type="password" placeholder="Enter password" /> */}
      <button>Login</button>
    </form>
  );
}
