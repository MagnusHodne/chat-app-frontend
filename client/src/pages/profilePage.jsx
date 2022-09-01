import React, { useContext, useState } from "react";
import { Button } from "../components/basics";
import { useLoading } from "../lib/useLoading";
import { ChatApiContext } from "../chatApiContext";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";
import { UserContext } from "../userContext";
import { Avatar } from "../components/avatar";
import { PaddedContent } from "../components/layoutComponents";

export function ProfilePage() {
  const { fetchUserInfo } = useContext(ChatApiContext);
  const { user } = useContext(UserContext);
  const { data, loading, error } = useLoading(() =>
    fetchUserInfo({ sub: user.sub })
  );
  if (loading)
    return <LoadingComponent message={"Fetching user bio, please wait..."} />;
  if (error) return <ErrorComponent error={"Unable to fetch user bio"} />;
  return <ProfileCard userinfo={data} initBio={data.bio} />;
}

function ProfileCard({ userinfo, initBio }) {
  const { updateUserBio } = useContext(ChatApiContext);

  const [bio, setBio] = useState(initBio);
  async function handleSubmit(e) {
    e.preventDefault();
    await updateUserBio({ bio, sub: userinfo.sub });
  }

  console.log(`Picture: ${userinfo.picture}`);
  return (
    <PaddedContent
      content={
        <>
          <div className={"h-24 w-24"}>
            <Avatar src={userinfo.picture} />
          </div>
          <h1 className={"text-2xl"}>{`${userinfo.name}`}</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <strong>Bio</strong>
              <textarea
                className={
                  "mx-0 my-1 w-full resize-none overflow-y-auto rounded-md border-none bg-thischord-500 pt-2 pl-2"
                }
                name="text"
                value={bio}
                rows={10}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </label>
            <Button title={"Update bio"} />
          </form>
        </>
      }
    />
  );
}
