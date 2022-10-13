import { useContext, useEffect, useState } from "react";
import { useLoading } from "../lib/useLoading";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";
import { ChatApiContext } from "../chatApiContext";
import { UserContext } from "../userContext";
import { ChatComponent } from "../components/chat";
import { IMessage } from "../types/IMessage";
import { IChatResponse } from "../types/IChatResponse";

function ChatConnection({ initialMessages }: { initialMessages: IMessage[] }) {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState(initialMessages);
  const [ws, setWs] = useState<WebSocket | null>();

  //Establishes a websocket on component mount
  useEffect(() => {
    const protocol = window.location.protocol;
    const ws: WebSocket = new WebSocket(
      (protocol === "http:" ? "ws://" : "wss://") + window.location.host
    );
    ws.onopen = (event) => {
      console.log("Opened", event);
    };
    ws.onmessage = (event) => {
      const res: IChatResponse = JSON.parse(event.data);
      if (res.action === "create") {
        setMessages((oldMessages) => [...oldMessages, res.message]);
      }
      if (res.action === "delete") {
        const { _id } = res.message;
        setMessages((oldMessages) =>
          oldMessages.filter((msg) => msg._id !== _id)
        );
      }
    };
    setWs(ws);
  }, []);

  function handleNewMessage(message: string) {
    ws?.send(JSON.stringify({ action: "create", message, user }));
  }
  function handleDeleteMessage(_id: string) {
    ws?.send(JSON.stringify({ action: "delete", _id }));
  }

  return (
    <ChatComponent
      messages={messages}
      onNewMessage={handleNewMessage}
      onDeleteMessage={handleDeleteMessage}
    />
  );
}

export function ChatPage() {
  const { fetchChatLog } = useContext(ChatApiContext);
  const { data, loading, error } = useLoading(fetchChatLog);
  if (loading)
    return <LoadingComponent message={"Fetching chat log, please wait..."} />;
  if (error)
    return (
      <ErrorComponent error={"Unable to fetch messages, please try again"} />
    );
  return <ChatConnection initialMessages={data} />;
}
