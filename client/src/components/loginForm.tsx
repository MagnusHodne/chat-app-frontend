import { Button } from "./basics";
import { Header } from "./layoutComponents";
import { useAuth0 } from "@auth0/auth0-react";

export function LoginForm() {
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

  return <Button title={"Login"} onClick={() => HandleLogin()} />;
}
