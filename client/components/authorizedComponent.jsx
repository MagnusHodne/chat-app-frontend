import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "./feedbackComponents";
import { ChatApiContext } from "../chatApiContext";

/**
 * Simple wrapper for components that require the user to be authorized
 * @param user the user object used for checking verification
 * @param {boolean} writeAccess Whether this component needs write access (default is false)
 * @param successComponent
 * @param failComponent
 * @param verificationFunction what function to use for verifying user. By default it uses the one specified in apiMethods
 */
export function AuthorizedComponent({
  user,
  writeAccess = false,
  successComponent = <div>Success</div>,
  failComponent = <div>Fail</div>,
}) {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
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
