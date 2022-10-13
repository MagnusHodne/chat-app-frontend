import { Button } from "./basics";
import { Header } from "./layoutComponents";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    navigate("/home");
  }

  return (
    <div
      className={
        "m-1 grid h-full grid-cols-2 grid-rows-[5em_1fr] gap-0 overflow-clip rounded-md"
      }
    >
      <Header />
      <div className={"col-span-2 min-h-0 bg-thischord-700"}>
        <div className={"flex h-full flex-col items-center justify-center"}>
          <h1>Welcome!</h1>
          <p>Please log in</p>
          <div className={"w flex w-72 flex-col"}>
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const HandleLogin = async () => {
    await loginWithRedirect({ prompt: "login" });
  };
  return <Button title={"Login"} onClick={HandleLogin} />;
}

export function LogoutButton() {
  const { logout } = useAuth0();
  const HandleLogout = async () => {
    let redirectUri = ""; //TODO - Add link to prod here
    if (process.env.NODE_ENV === "development") {
      redirectUri = "http://localhost:3000";
    }
    await logout({ returnTo: redirectUri });
  };

  return (
    <Button
      title={"Logout"}
      className={"hover:bg-red-800"}
      onClick={HandleLogout}
    />
  );
}
