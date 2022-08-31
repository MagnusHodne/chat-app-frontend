import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "./feedbackComponents";
import { ChatApiContext } from "../chatApiContext";
import { UserContext } from "../userContext";

/**
 * Simple wrapper for components that require the user to be authorized
 * @param user the user object used for checking verification
 * @param {boolean} writeAccess Whether this component needs write access (default is false)
 * @param successComponent
 * @param failComponent
 */
export function AuthorizedComponent({
  writeAccess = false,
  successComponent = <div>Success</div>,
  failComponent = <div>Fail</div>,
}) {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const { user } = useContext(UserContext);
  const { verifyUser } = useContext(ChatApiContext);
  useEffect(() => {
    if (!verifyUser(user)) {
      navigate("/startlogin");
    } else {
      setVerified(true);
    }
  }, []);
  if (!verified)
    return <LoadingComponent message={"Redirecting to login..."} />;
  return successComponent;
}
