import React from "react";
import { MeetingProvider } from "./MeetingContext";
import Meeting from "./Meeting";
import { ChatProvider } from "./ChatContext";

const MeetingContainer = () => {
  return (
    <MeetingProvider>
      <ChatProvider>
        <Meeting />
      </ChatProvider>
    </MeetingProvider>
  );
};

export default MeetingContainer;
