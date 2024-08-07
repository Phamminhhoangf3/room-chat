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
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <Chat
      selectedUser={selectedUser}
      isMobile={isMobile}
    />
  );
}
