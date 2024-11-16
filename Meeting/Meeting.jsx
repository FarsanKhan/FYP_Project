import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../ui/VideoPlayer";
import { useStore } from "../../lib/store";
import { ws } from "../../lib/ws";
import { TypographyP } from "../ui/typography";
import { cn, getRandomInitailsImage, iconProps } from "../../lib/utils";
import { Button } from "../ui/button";
import { LucideMessagesSquare, Mic, Video } from "lucide-react";
import { FaPhone } from "react-icons/fa";
import { MeetingContext } from "./MeetingContext";
import Chat from "./Chat";
import { ChatContext } from "./ChatContext";

const Meeting = () => {
  const { id } = useParams();
  // const mount = useRef();
  const user = useStore((state) => state.user);
  const {
    me,
    setMeetingId,
    participants,
    stream,
    onToggleMic,
    onToggleVideo,
    streamSettings,
  } = useContext(MeetingContext);
  const { toggleChat, chat } = useContext(ChatContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (me) {
      setMeetingId(id);
      setTimeout(() => {
        setLoading(false);
        ws.emit("join-meeting", {
          meetingId: id,
          peerId: user.id,
          user: {
            userName: user.name,
            type: user.type,
            image: user.image,
          },
        });
      }, 1000);
    }
    // window.location.reload();
    return () => {
      ws.off("join-meeting");
      // mount.current = true;
    };
  }, [me]);

  return (
    <div className="bg-neutral-800 p-5 flex flex-col justify-center align-center h-full overflow-auto">
      <div className="h-[65px]">
        <div className="absolute top-[-45px] left-[-5px]">
          <img
            src="/logo-transparent.png"
            alt="logo"
            width={250}
            height={250}
          />
        </div>
      </div>
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="loader-lg"></div>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "flex-1 grid gap-5 items-center",
              Object.keys(participants).length === 1
                ? "grid-cols-1 justify-items-center"
                : Object.keys(participants).length > 1 &&
                  Object.keys(participants).length <= 4
                ? "grid-cols-2"
                : Object.keys(participants).length > 4 &&
                  Object.keys(participants).length <= 9
                ? "grid-cols-3"
                : "grid-cols-4"
            )}
          >
            <div
              className={cn(
                "rounded-md overflow-hidden relative bg-neutral-700 h-full",
                Object.keys(participants).length === 1 ? "w-[80%]" : "w-full"
              )}
            >
              {(!stream || !streamSettings.video) && (
                <div className="z-10 absolute flex items-center justify-center bg-neutral-700 w-full h-full">
                  <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={
                        user.image
                          ? import.meta.env.VITE_API_BASE_URL + user.image
                          : user.type === "job_seeker"
                          ? getRandomInitailsImage(user.name)
                          : "/ghost-company.jpg"
                      }
                      alt="user-placeholder"
                    />
                  </div>
                </div>
              )}
              <div className="absolute w-full h-full">
                <VideoPlayer
                  className={
                    Object.keys(participants).length === 1
                      ? "object-bottom"
                      : ""
                  }
                  stream={stream}
                />
              </div>
              <div className="z-20 absolute bottom-2 left-4 text-white">
                <TypographyP className="text-lg">Me</TypographyP>
              </div>
            </div>
            {Object.values(participants)
              .filter((participant) => participant.peerId != user.id)
              .map((participant) => {
                return (
                  <div
                    key={participant.peerId}
                    className={cn(
                      "rounded-md overflow-hidden relative bg-neutral-700 h-full"
                    )}
                  >
                    {(!participant.stream || participant.video === "off") && (
                      <div className="z-10 absolute flex items-center justify-center bg-neutral-700 w-full h-full">
                        <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                          <img
                            className="object-cover w-full h-full"
                            src={
                              participant.image
                                ? import.meta.env.VITE_API_BASE_URL +
                                  participant.image
                                : participant.type === "job_seeker"
                                ? getRandomInitailsImage(participant.name)
                                : "/ghost-company.jpg"
                            }
                            alt="user-placeholder"
                          />
                        </div>
                      </div>
                    )}
                    <div className="absolute w-full h-full">
                      <VideoPlayer stream={participant.stream} />
                    </div>
                    <div className="z-20 absolute bottom-2 left-4 text-white">
                      <TypographyP className="text-lg">
                        {participant.userName}
                      </TypographyP>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="h-20 flex items-center justify-center">
            <div className="bg-neutral-700 p-3 rounded-md w-fit gap-5 flex justify-center items-center">
              <Button
                onClick={onToggleMic}
                className={cn(
                  streamSettings.mic
                    ? "!bg-accent"
                    : "meeting-icon hover:bg-transparent"
                )}
                variant="ghost"
                size="icon"
              >
                <Mic
                  size={iconProps.size}
                  color={streamSettings.mic ? "black" : undefined}
                />
              </Button>
              <Button
                onClick={onToggleVideo}
                className={cn(
                  streamSettings.video
                    ? "!bg-accent"
                    : "meeting-icon hover:bg-transparent"
                )}
                variant="ghost"
                size="icon"
              >
                <Video
                  size={iconProps.size}
                  color={streamSettings.video ? "black" : undefined}
                />
              </Button>
              <Button
                onClick={toggleChat}
                className={"meeting-icon"}
                variant="ghost"
                size="icon"
              >
                <LucideMessagesSquare size={iconProps.size} />
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/app/messaging";
                }}
                className="!bg-red-600"
                variant="ghost"
                size="icon"
              >
                <FaPhone
                  style={{ transform: "rotate(225deg)" }}
                  color="white"
                  size="1.35em"
                />
              </Button>
            </div>
          </div>
          {chat.isChatOpen && <Chat onClose={toggleChat} />}
        </>
      )}
    </div>
  );
};

export default Meeting;
