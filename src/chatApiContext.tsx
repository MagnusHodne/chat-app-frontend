import React from "react";
import {
  deleteJSON,
  fetchJSON,
  fetchJSONWithToken,
  postJSONWithToken,
  putJSON,
} from "./lib/fetchUtils";
import { IUser } from "./types/IUser";

export const ChatApiContext = React.createContext({
  /*==== API OPERATIONS =====*/
  async registerLogin(user: any, token: string) {
    console.log(`Registering login with user: ${JSON.stringify(user)}`);
    return await postJSONWithToken("/api/v1/user/login", token, user);
  },
  async fetchChatLog(token: string) {
    return await fetchJSONWithToken("/api/v1/chats", token);
  },
  async fetchUserInfo({ sub }: { sub: string | undefined }): Promise<IUser> {
    return await fetchJSON(`/api/v1/user?sub=${sub}`);
  },
  async updateUserBio({ sub, bio }: { sub: string; bio: string }) {
    return await putJSON("/api/v1/user", { sub, bio });
  },
  async deleteMessage({ _id }: { _id: any }) {
    return await deleteJSON("/api/v1/chats", { _id });
  },
});
