"use client";

import React, { useEffect, useState } from "react";
import { userData } from "./data";
import { Chat } from "./chat";

export function ChatLayout() {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <Chat
      // messages={selectedUser.messages}
      selectedUser={selectedUser}
      isMobile={isMobile}
    />
  );
}
