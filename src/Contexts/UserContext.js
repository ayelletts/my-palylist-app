import { createContext } from "react";

export function login(userName, password) {
  // if
  return {
    username: "testUser",
    userid: "1",
    playlists: ["1,2,3", "11,22,33", "211,311,411"],
    token: "123456",
  };
}

export const UserContext = createContext();
