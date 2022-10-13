import React from "react";
import { deleteJSON, fetchJSON, putJSON } from "./lib/fetchUtils";
import { IUser } from "./types/user";

export const ChatApiContext = React.createContext({
  /*==== DATABASE OPERATIONS =====*/
  async fetchChatLog() {
    return await fetchJSON("/api/v1/chats");
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
