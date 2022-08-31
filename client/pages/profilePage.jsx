import React, { useContext, useState } from "react";
import { Button } from "../components/basics";
import { useLoading } from "../lib/useLoading";
import { ChatApiContext } from "../chatApiContext";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";

export function ProfilePage({ user }) {
  const { fetchUserInfo } = useContext(ChatApiContext);
  const { data, loading, error } = useLoading(() =>
    fetchUserInfo({ sub: user.sub })
  );
  if (loading)
    return <LoadingComponent message={"Fetching user bio, please wait..."} />;
  if (error) return <ErrorComponent error={"Unable to fetch user bio"} />;
  return <ProfileCard userinfo={user} initBio={data.bio} />;
}

function ProfileCard({ userinfo, initBio }) {
  const { updateUserBio } = useContext(ChatApiContext);

  const [bio, setBio] = useState(initBio);
  async function handleSubmit(e) {
    e.preventDefault();
    await updateUserBio({ bio, sub: userinfo.sub });
    console.log("update bio from here");
  }
  return (
    <div className={"profile-card"}>
      {/*<Button to={"/"} title={"Back"} />*/}
      {userinfo.picture && <ProfilePicture url={userinfo.picture} />}
      <h1>{`${userinfo.name}`}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Bio</strong>
          <textarea
            name="text"
            value={bio}
            rows={10}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </label>
        <button>Update bio</button>
      </form>
    </div>
  );
}

function ProfilePicture({ url }) {
  return (
    <img className={"profile-picture"} src={url} alt={"profile picture"} />
  );
}
