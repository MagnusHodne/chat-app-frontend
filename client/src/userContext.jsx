import React from "react";

export const UserContext = React.createContext({
  user: {},
  verifyUser(user) {
    if (!user) return false;
    return Object.entries(user).length !== 0;
  },
});
