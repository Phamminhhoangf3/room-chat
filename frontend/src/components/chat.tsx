import React, { SyntheticEvent, useEffect, useState } from "react";
import { UserData } from "./data";
import { ChatList } from "./chat-list";
import { io } from "socket.io-client";
import { FormLogin } from "./formLogin";
import ChatTopbar from "./chat-topbar";

const IO_PORT = import.meta.env.VITE_YOUR_IO_PORT;

export function Chat() {
  const [socket, setSocket] = useState<any>();
  const [account, setAccount] = useState<UserData>();
  const [messages, setMessages] = useState<any>([]);
  const [dataRoom, setDataRoom] = useState({ users: [], room: "" });
  const [valuesForm, setValuesForm] = useState<any>({
    username: "Hoàng",
    room: "1",
    avatar: "/User1.png",
  });
  const { room, username, avatar } = valuesForm;

  useEffect(() => {
    const OI_URI = `http://localhost:${IO_PORT}/`;
    const _socket = io(OI_URI);
    _socket.on("message", ({ sender, message, avatar }) => {
      const newMsg = {
        id: 6,
        avatar,
        name: sender,
        message: message,
      };
      setMessages((prev: any) => [...prev, newMsg]);
    });
    _socket.on("roomData", ({ room, users }) => {
      setDataRoom({ room, users });
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
      socket.emit("joinRoom", { username, room, avatar });
    }
  };

  const sendMessage = (newMessage: string) => {
    socket.emit("chatMessage", newMessage);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {account ? (
        <>
          <ChatTopbar dataRoom={dataRoom} />
          <ChatList
            messages={messages}
            sendMessage={sendMessage}
            account={account}
          />
        </>
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
