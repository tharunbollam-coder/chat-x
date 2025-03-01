"use client";

import ChatsItem from "./ChatsItem";
import SearchBar from "./SearchBar";


import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const ChatList = (props: any) => {
  const chats = useSelector((state: RootState) => state.chat.chatList);
  const {handleChatWindow,customClass} = props
  
  return (
    <div className={`${customClass} bg-white rounded-lg p-5 shadow-md col-span-12 md:col-span-11 lg:col-span-4`}>
      <SearchBar/>
      <h1 className="text-[#303030] font-bold mb-5 mt-5 ml-2">Chats</h1>
      <ul className="p-0">
        {chats.map((chat) => (
          <ChatsItem handleChatWindow={handleChatWindow} key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
