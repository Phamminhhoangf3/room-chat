import React, { useEffect, useState } from "react";
import { loggedInUserData, Message, UserData } from "./data";
import { ChatList } from "./chat-list";
import { io } from "socket.io-client";

interface ChatProps {
  // messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({
  // messages,
  selectedUser,
  isMobile,
}: ChatProps) {
  // const [messagesState, setMessages] = React.useState<Message[]>(messages ?? []);
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState<any>();
  const [room, setRoom] = useState("");
  const [account, setAccount] = useState<UserData>();
  console.log("🚀 ~ account:", account);
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const _socket = io("http://localhost:3000");
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
      setMessages((prev) => [...prev, newMsg]);
    });
    setSocket(_socket);
    return () => {
      _socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (username && room) {
      if (!account)
        setAccount({
          id: 6,
          avatar: "/User2.png",
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
      <ChatList
        messages={messages}
        sendMessage={sendMessage}
        isMobile={isMobile}
        account={account}
      />
      {!account && (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      )}
    </div>
  );
}
