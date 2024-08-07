import React, { useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Message, UserData } from "./data";
import ChatBottombar from "./chat-bottombar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface ChatListProps {
  messages?: Message[];
  sendMessage: (newMessage: string) => void;
  account: UserData | undefined;
}

export function ChatList({
  messages,
  sendMessage,
  account,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {account &&
            messages?.map((message, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: "spring",
                    bounce: 0.3,
                    duration: messages.indexOf(message) * 0.05 + 0.2,
                  },
                }}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
                className={clsx("flex flex-col gap-2 p-4 whitespace-pre-wrap", {
                  "items-start": message.name !== account.name,
                  "items-end": message.name === account.name,
                })}
              >
                <div className="flex gap-3 items-center">
                  {message.name !== account.name && (
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        className="rounded-full"
                        src={message.avatar}
                        alt={message.name}
                        width={50}
                        height={50}
                      />
                    </Avatar>
                  )}
                  <span className=" bg-gray-200 p-3 rounded-md max-w-xs">
                    {message.message}
                  </span>
                  {message.name === account.name && (
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        className="rounded-full"
                        src={message.avatar}
                        alt={message.name}
                        width={50}
                        height={50}
                      />
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} />
    </div>
  );
}
