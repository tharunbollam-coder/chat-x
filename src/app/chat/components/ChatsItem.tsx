import { CheckCheck } from "lucide-react";
import {useDispatch } from "react-redux";
import {setActiveChat} from "../../../redux/slices/chatSlice"

import React from "react";
import { set } from "react-hook-form";

const ChatsItem = (props: any) => {
  const dispatch = useDispatch();
  const { chat,handleChatWindow } = props;
  const { name, lastMessage, time,id } = chat;
  const handleActiveChat = () => {
     dispatch(setActiveChat(id))
     handleChatWindow(true)
  }
  return (
    <li onClick={() => handleActiveChat()} className="list-none">
      <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full"
          />
          <div>
            <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white">
              {name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate w-32 sm:w-40 md:w-52">
              {lastMessage}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] sm:text-xs text-gray-400">{time}</span>
          <CheckCheck className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
        </div>
      
      </div>
      <hr className="my-1 sm:my-2" />
    </li>
  );
};

export default ChatsItem;
