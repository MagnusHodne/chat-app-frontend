import React, { useContext, useEffect, useState } from "react";
import { useLoading } from "../lib/useLoading";
import {
  ErrorComponent,
  LoadingComponent,
} from "../components/feedbackComponents";
import { ChatApiContext } from "../chatApiContext";
import { ChatComponent } from "../components/chatComponents";

function ChatConnection({ initialMessages, user }) {
  const [messages, setMessages] = useState(initialMessages);
  const [ws, setWs] = useState({});

  //Establishes a websocket on component mount
  useEffect(() => {
    const protocol = window.location.protocol;
    const ws = new WebSocket(
      (protocol === "http:" ? "ws://" : "wss://") + window.location.host
    );
    ws.onopen = (event) => {
      console.log("Opened", event);
    };
    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      if (res.action === "create") {
        const { message, user, created, _id } = res;
        setMessages((oldMessages) => [
          ...oldMessages,
          { message, user, created, _id },
        ]);
      }
      if (res.action === "delete") {
        const { _id } = res;
        setMessages((oldMessages) =>
          oldMessages.filter((msg) => msg._id !== _id)
        );
      }
    };
    setWs(ws);
  }, []);

  function handleNewMessage(message) {
    ws.send(JSON.stringify({ action: "create", message, user }));
  }
  function handleDeleteMessage(_id) {
    ws.send(JSON.stringify({ action: "delete", _id }));
  }

  return (
    <ChatComponent
      messages={messages}
      onNewMessage={handleNewMessage}
      onDeleteMessage={handleDeleteMessage}
    />
  );
}

export function ChatPage({ user }) {
  const { fetchChatLog } = useContext(ChatApiContext);
  const { data, loading, error } = useLoading(fetchChatLog);
  if (loading)
    return <LoadingComponent message={"Fetching chat log, please wait..."} />;
  if (error)
    return (
      <ErrorComponent error={"Unable to fetch messages, please try again"} />
    );
  return <ChatConnection user={user} initialMessages={data} />;
}
