"use client"

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { sendMessage } from "../../../redux/slices/chatSlice";

import {
  Phone,
  Video,
  Mic,
  Paperclip,
  SmilePlus,
  Camera,
  CircleChevronLeft,
} from "lucide-react";
import MessageItem from "./MessageItem";
const ChatWindow = (props: any) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const activeChatId = useSelector(
    (state: RootState) => state.chat.activeChatId
  );
  const chat: any = useSelector((state: RootState) =>
    state.chat.chatList.find((c) => c.id === activeChatId)
  );

  const handleSendMessage = (e: any) => {
    if (e.key === "Enter") {
      if (!userInput.trim()) return; // Prevent sending empty messages

      dispatch(
        sendMessage({
          chatId: activeChatId,
          message: {
            id: Date.now().toString(),
            sender: "User",
            text: userInput,
            timestamp: new Date().toISOString(),
          },
        })
      );

      setUserInput(""); // Clear input field after sending
    }
  };

  const { customClass, handleChatWindow } = props;
  return (
    <div
      className={`${customClass} flex-col justify-evenly bg-white shadow-md p-4 rounded-lg h-[100%] col-span-12 md:col-span-11 lg:col-span-7`}
    >
      <div>
        <div className="flex items-center justify-between border-b pb-2">
          <CircleChevronLeft
            onClick={() => handleChatWindow(false)}
            className="text-[#9747FF] mb-2 lg:hidden"
          />
          <div className="flex items-center justify-between pb-2 w-[100%]">
            <div className="flex items-center space-x-3">
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{chat.name}</p>
                <p className="text-xs text-gray-500">
                  Online - Last seen, 2:02pm
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Phone className="w-5 h-5 text-[#9747FF]" />
              <Video className="w-5 h-5 text-[#9747FF]" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[70vh] overflow-y-auto">
        <div className="p-4 ">
          {chat.messages.map((message: any) => {
            if (message.sender === "User") {
              return <MessageItem message={message} key={message.id} />;
            }
            return <MessageItem message={message} key={message.id} />;
          })}
        </div>
      </div>
      <div>
        <div className="flex items-center p-2 ">
          <Paperclip className="w-5 h-5 text-[#9747FF]" />
          <input
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            onKeyDown={handleSendMessage}
            type="text"
            placeholder="Type your message here..."
            className="flex-1 mx-3 p-3 bg-[#EFF6FCDE] rounded-full"
          />
          <SmilePlus className="w-5 mr-1 h-5 text-[#9747FF]" />
          <Camera className="w-5 h-5 text-[#9747FF]" />
          <div className="p-3 bg-purple-600 rounded-full ml-3">
            <Mic className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
