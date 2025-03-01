"use client";

import { useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "components/ProtectedRoute";

const page = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const handleChatWindow = (p: boolean) => setIsChatOpen(p);
  return (
    
      <div className="bg-[#EFF6FC] p-6 grid grid-cols-12 gap-4 h-[100vh]">
        <Sidebar />
        {!isChatOpen && (
          <ChatList
            handleChatWindow={handleChatWindow}
            customClass="lg:hidden"
          />
        )}
        <ChatList
          customClass="hidden lg:block"
          handleChatWindow={handleChatWindow}
        />
        <ChatWindow
          customClass="hidden lg:block"
          handleChatWindow={handleChatWindow}
        />
        {isChatOpen && (
          <ChatWindow
            customClass="lg:hidden"
            handleChatWindow={handleChatWindow}
          />
        )}
      </div>
    
  );
};

export default page;
