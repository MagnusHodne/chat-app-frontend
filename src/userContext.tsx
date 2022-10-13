import React from "react";

export const UserContext = React.createContext({
  user: {},
  verifyUser(user: any) {
    if (!user) return false;
    return Object.entries(user).length !== 0;
  },
});
