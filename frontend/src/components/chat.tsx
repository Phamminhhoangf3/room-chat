import React, { SyntheticEvent, useEffect, useState } from "react";
import { Message, UserData } from "./data";
import { ChatList } from "./chat-list";
import { io } from "socket.io-client";
import { FormLogin } from "./formLogin";
interface ChatProps {
  selectedUser: UserData;
  isMobile: boolean;
}

const ioPort = import.meta.env.VITE_YOUR_API_KEY;
export function Chat({ isMobile }: ChatProps) {
  const [socket, setSocket] = useState<any>();
  const [account, setAccount] = useState<UserData>();
  const [messages, setMessages] = useState<any>([]);
  const [valuesForm, setValuesForm] = useState<any>({
    username: "Hoàng",
    room: "1",
    avatar: "/User1.png",
  });
  const { room, username, avatar } = valuesForm;

  useEffect(() => {
    const OI_URI = `http://localhost:${ioPort}/`;
    const _socket = io(OI_URI);
    _socket.on("message", (sender, message) => {
      const newMsg =
        typeof message === "string"
          ? {
              id: 6,
              avatar: "/User1.png",
              name: sender,
              message: message,
            }
          : message;
      setMessages((prev: any) => [...prev, newMsg]);
    });
    setSocket(_socket);
    return () => {
      _socket.disconnect();
    };
  }, []);

  const joinRoom = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    if (username && room) {
      if (!account)
        setAccount({
          id: 6,
          avatar,
          name: username,
        });
      socket.emit("joinRoom", { username, room });
    }
  };

  const sendMessage = (newMessage: Message) => {
    socket.emit("chatMessage", newMessage);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {account ? (
        <ChatList
          messages={messages}
          sendMessage={sendMessage}
          isMobile={isMobile}
          account={account}
        />
      ) : (
        <FormLogin
          joinRoom={joinRoom}
          setValuesForm={setValuesForm}
          valuesForm={valuesForm}
        />
      )}
    </div>
  );
}
