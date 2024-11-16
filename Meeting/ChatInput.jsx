import { useContext, useState } from "react";
import { ChatContext } from "./ChatContext";
import { MeetingContext } from "./MeetingContext";
import { useStore } from "../../lib/store";
import { Input } from "../ui/input";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(ChatContext);
  const user = useStore((state) => state.user);
  const { meetingId } = useContext(MeetingContext);

  const onSend = () => {
    sendMessage(message, meetingId, user.id);
    setMessage("");
  };

  return (
    <div>
      <Input
        placeholder="Enter message"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSend();
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
    </div>
  );
};
