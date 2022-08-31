import React from "react";
import {
  deleteJSON,
  fetchJSON,
  postJSONNoReturn,
  putJSON,
} from "./lib/fetchUtils";
import { randomString } from "./lib/randomString";
import { sha256 } from "./lib/sha256";

export const ChatApiContext = React.createContext({
  /**
   * Fetches login info from the server (body contains both configs for the different providers, as
   * well as the user info (if any))
   */
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },
  /**
   * Sends the access_token from a provider to the server (so that it can be signed)
   * @param provider the provider that has been used
   * @param login the login info, which must contain an access_token
   */
  async registerLogin(provider, login) {
    return await postJSONNoReturn(`/api/login/${provider}`, login);
  },
  /**
   * The actual method that handles login. Redirects to the provider endpoint
   * @param provider
   * @param config The config object, obtained from the server
   */
  async handleLogin(provider, config) {
    const {
      authorization_endpoint,
      response_type,
      scope,
      client_id,
      code_challenge_method,
    } = config[provider];

    //Code challenge state?
    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);

    //The url parameters we send to the provider
    const params = {
      response_type,
      response_mode: "fragment",
      client_id,
      state,
      scope,
      redirect_uri: `${window.location.origin}/login/${provider}/callback`,
    };

    //Code challenge stuff, if applicable
    if (code_challenge_method) {
      const code_verifier = randomString(50);
      window.sessionStorage.setItem("code_verifier", code_verifier);
      params.code_challenge_method = code_challenge_method;
      params.code_challenge = await sha256(code_verifier);
    }

    //Redirecting the user to the authorization endpoint
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  },
  getCallbackParameters() {
    return Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
  },
  getExpectedState() {
    return window.sessionStorage.getItem("expected_state");
  },

  /**
   * Makes the server delete our cookies (effectively logging us out)
   */
  async endSession() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
  verifyUser(user) {
    if (!user) return false;
    return Object.entries(user).length !== 0;
  },
  /*==== DATABASE OPERATIONS =====*/
  async fetchChatLog() {
    return await fetchJSON("/api/chat");
  },
  async fetchUserInfo({ sub }) {
    return await fetchJSON(`/api/user?sub=${sub}`);
  },
  async updateUserBio({ sub, bio }) {
    return await putJSON("/api/user", { sub, bio });
  },
  async deleteMessage({ _id }) {
    return await deleteJSON("/api/chat", { _id });
  },
});
