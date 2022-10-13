import React from "react";
import { LoadingComponent } from "./feedbackComponents";
import { withAuthenticationRequired } from "@auth0/auth0-react";

// Wrapper class for Auth0's withAuthenticationRequired hook
const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => <>{children}</>;

export default withAuthenticationRequired(ProtectedRoute, {
  onRedirecting: () => (
    <LoadingComponent message={"Redirecting to login page..."} />
  ),
});
