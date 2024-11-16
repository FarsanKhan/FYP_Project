import React, { useContext } from "react";
import { cn, iconProps } from "../../lib/utils";
import { GoX } from "react-icons/go";
import { TypographyH4, TypographyMuted } from "../ui/typography";
import { ChatContext } from "./ChatContext";
import Empty from "../ui/Empty";
import ChatMessage from "./ChatMessage";
import { ChatInput } from "./ChatInput";

const Chat = ({ onClose }) => {
  const { chat } = useContext(ChatContext);
  return (
    <div
      className={cn(
        "justify-between rounded-md absolute right-5 top-8 p-5 border-l border-l-neutral-200 flex flex-col gap-2 bg-white"
      )}
      style={{ height: "calc(100vh - 150px)" }}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <TypographyH4>In-call messages</TypographyH4>
          <TypographyMuted>
            Showing all the messages for this meeting
          </TypographyMuted>
        </div>
        <GoX
          {...iconProps}
          onClick={onClose}
          className="cursor-pointer"
          size="1.5em"
        />
      </div>

      <div className="flex-1 overflow-auto">
        {chat.messages.length > 0 ? (
          chat.messages.map((message) => (
            <ChatMessage
              message={message}
              key={message.timestamp + (message?.author || "anonymous")}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full p-5 bg-white">
            <Empty entity="meeting-messages" message="No messages found." />
          </div>
        )}
      </div>
      <ChatInput />
    </div>
  );
};

export default Chat;
