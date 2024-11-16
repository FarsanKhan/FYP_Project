import { createContext, useEffect, useReducer } from "react";
import { chatReducer } from "./utils/chatReducer";
import {
  addHistoryAction,
  addMessageAction,
  toggleChatAction,
} from "./utils/chatActions";
import { ws } from "../../lib/ws";

export const ChatContext = createContext({
  chat: {
    messages: [],
    isChatOpen: false,
  },
  sendMessage: (message, meetingId, author) => {},
  toggleChat: () => {},
});

export const ChatProvider = ({ children }) => {
  const [chat, chatDispatch] = useReducer(chatReducer, {
    messages: [],
    isChatOpen: false,
  });

  const sendMessage = (message, meetingId, author) => {
    const messageData = {
      content: message,
      timestamp: new Date().getTime(),
      author,
    };
    chatDispatch(addMessageAction(messageData));

    ws.emit("send-message", meetingId, messageData);
  };

  const addMessage = (message) => {
    chatDispatch(addMessageAction(message));
  };

  const addHistory = (messages) => {
    chatDispatch(addHistoryAction(messages));
  };

  const toggleChat = () => {
    chatDispatch(toggleChatAction(!chat.isChatOpen));
  };
  useEffect(() => {
    ws.on("add-message", addMessage);
    ws.on("get-messages", addHistory);
    return () => {
      ws.off("add-message", addMessage);
      ws.off("get-messages", addHistory);
    };
  }, []);
  return (
    <ChatContext.Provider
      value={{
        chat,
        sendMessage,
        toggleChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
