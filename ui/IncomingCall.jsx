import React, { useEffect, useRef } from "react";
import { TypographyMuted, TypographyP } from "./typography";
import { LoaderButton } from "./button";
import { FaPhone } from "react-icons/fa";

const IncomingCall = ({ meetingId, creator: user = {}, onClose }) => {
  const audioRef = useRef();
  useEffect(() => {
    audioRef.current = new Audio("/audio/call.mp3");
    const playAudio = () => {
      audioRef.current.play();
    };
    audioRef.current.addEventListener("ended", playAudio);
    setTimeout(() => {
      playAudio();
    }, 1000);

    return () => {
      audioRef.current.pause();
      audioRef.current.removeEventListener("ended", playAudio);
    };
  }, []);

  const onReject = () => {
    if (audioRef.current) audioRef.current.pause();
    onClose();
  };

  const onJoin = () => {
    window.location.href = `/app/meeting/${meetingId}`;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="incoming-call min-w-[300px] bg-[#151C25] rounded-lg p-7">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                user.image
                  ? import.meta.env.VITE_API_BASE_URL + user.image
                  : user.type === "job_seeker"
                  ? getRandomInitailsImage(user.name)
                  : "/ghost-company.jpg"
              }
              alt={user.name}
            />
          </div>
          <div className="text-center">
            <TypographyP className="text-white">{user.name}</TypographyP>
            <TypographyMuted>is now calling...</TypographyMuted>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <LoaderButton onClick={onReject} className="bg-red-600 text-white">
            <FaPhone
              style={{ transform: "rotate(225deg)" }}
              color="white"
              size="1.25em"
            />
            <span className="ml-3">Reject</span>
          </LoaderButton>
          <LoaderButton onClick={onJoin} className="bg-green-700 text-white">
            <FaPhone
              color="white"
              size="1.25em"
              style={{ transform: "rotate(90deg)" }}
            />
            <span className="ml-3">Accept</span>
          </LoaderButton>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
