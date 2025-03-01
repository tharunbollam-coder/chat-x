import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
  messages: ChatMessage[];
}

interface ChatState {
  chatList: Chat[];
  activeChatId: string | null | any;
}

const initialState: ChatState = {
  chatList: [
    {
      id: "1",
      name: "Anil",
      lastMessage: "April fool’s day",
      unreadCount: 2,
      messages: [
        {
          id: "1",
          sender: "User",
          text: "Hey There!",
          timestamp: "2025-02-28T20:30:00Z",
        },
        {
          id: "2",
          sender: "Bot",
          text: "Hello! How can I help you today?",
          timestamp: "2025-02-28T20:31:00Z",
        },
        {
          id: "3",
          sender: "User",
          text: "Can you tell me about our meeting tomorrow?",
          timestamp: "2025-02-28T20:32:00Z",
        },
        {
          id: "4",
          sender: "Bot",
          text: "Sure! Your meeting is scheduled for 10 AM.",
          timestamp: "2025-02-28T20:33:00Z",
        },
        {
          id: "5",
          sender: "User",
          text: "Great! Thanks a lot.",
          timestamp: "2025-02-28T20:34:00Z",
        },
        {
          id: "6",
          sender: "Bot",
          text: "You're welcome! Let me know if you need anything else.",
          timestamp: "2025-02-28T20:35:00Z",
        },
      ],
    },
    {
      id: "2",
      name: "Chuuttiya",
      lastMessage: "Baag",
      unreadCount: 1,
      messages: [
        {
          id: "1",
          sender: "User",
          text: "Hey, how's it going?",
          timestamp: "10:30 AM",
        },
        {
          id: "2",
          sender: "Bob",
          text: "I'm good! Just working on my project.",
          timestamp: "10:31 AM",
        },
        {
          id: "3",
          sender: "User",
          text: "That’s great! Need any help?",
          timestamp: "10:32 AM",
        },
        {
          id: "4",
          sender: "Bob",
          text: "Maybe later. Just setting up Redux Saga now.",
          timestamp: "10:33 AM",
        },
        {
          id: "5",
          sender: "User",
          text: "Nice! Let me know if you get stuck.",
          timestamp: "10:34 AM",
        },
        {
          id: "6",
          sender: "Bob",
          text: "Will do, thanks!",
          timestamp: "10:35 AM",
        },
      ],
    },
    {
      id: "3",
      name: "Mary Ma’am",
      lastMessage: "You have to report it…",
      unreadCount: 1,
      messages: [],
    },
    {
      id: "4",
      name: "Bill Gates",
      lastMessage: "Nevermind bro",
      unreadCount: 5,
      messages: [],
    },
    {
      id: "5",
      name: "Victoria H",
      lastMessage: "Okay, brother. Let’s see…",
      unreadCount: 0,
      messages: [],
    },
  ],
  activeChatId: "1",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat(state, action: PayloadAction<string>) {
      state.activeChatId = action.payload;
    },
    sendMessage(
      state,
      action: PayloadAction<{ chatId: string; message: ChatMessage }>
    ) {
      const chat = state.chatList.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        chat.lastMessage = action.payload.message.text;
      }
    },
    receiveMessage(
      state,
      action: PayloadAction<{ chatId: string; message: ChatMessage }>
    ) {
      const chat = state.chatList.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        chat.unreadCount += 1;
      }
    },
    markAsRead(state, action: PayloadAction<string>) {
      const chat = state.chatList.find((c) => c.id === action.payload);
      if (chat) {
        chat.unreadCount = 0;
      }
    },
  },
});

export const { setActiveChat, sendMessage, receiveMessage, markAsRead } =
  chatSlice.actions;
export default chatSlice.reducer;
