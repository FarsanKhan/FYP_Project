import React, { useContext } from "react";
import { MeetingContext } from "./MeetingContext";
import { useStore } from "../../lib/store";
import { cn } from "../../lib/utils";
import { TypographyMuted, TypographyP } from "../ui/typography";

const ChatMessage = ({ message }) => {
  const { participants } = useContext(MeetingContext);
  const user = useStore((state) => state.user);
  const author =
    message.author && participants[message.author]
      ? participants[message.author].userName
      : "";
  const userName = author || "Anonimus";
  const isSelf = message.author == user.id;
  const time = new Date(message.timestamp).toLocaleTimeString();
  return (
    <div className="w-full mb-3">
      <div className="flex flex-col">
        <div className={cn("inline-block py-2 px-4 rounded bg-neutral-100")}>
          <TypographyP
            className={cn("text-sm", isSelf ? "text-left" : "text-left")}
          >
            {isSelf ? "You" : userName}
          </TypographyP>
          <div className="mt-1">
            <TypographyP className="text-sm">{message.content}</TypographyP>
            <TypographyMuted
              className={cn("text-xs", isSelf ? "text-right" : "text-left")}
            >
              {time}
            </TypographyMuted>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
