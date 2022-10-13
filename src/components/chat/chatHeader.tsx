import { FAIcon } from "../basics";

export function ChatHeader({ name }: { name: string }) {
  return (
    <div className={`flex flex-row items-center gap-2 pl-4`}>
      <FAIcon icon={"fa-solid fa-hashtag"} />
      <h3 className={"font-black"}>{name}</h3>
    </div>
  );
}
