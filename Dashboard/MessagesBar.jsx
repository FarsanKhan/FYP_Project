import React, { useState } from "react";
import { TypographyP } from "../ui/typography";
import { useStore } from "../../lib/store";
import { cn, getRandomInitailsImage, iconProps } from "../../lib/utils";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import AllMessages from "./AllMessages";
import MessageDetails from "../Messaging/MessageDetails";

const MessagesBar = () => {
  const user = useStore((state) => state.user);
  const [active, setActive] = useState(null);
  const [minimized, setMinimized] = useState(true);

  return (
    <div
      className={cn(
        "message-list flex flex-col w-[288px] bg-white fixed bottom-0 right-8",
        minimized ? "is-minimized" : ""
      )}
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div
        onClick={() => setMinimized(!minimized)}
        className="header justify-between cursor-pointer p-2 border-b border-b-neutral-200 flex items-center"
      >
        <div className="flex items-center gap-3">
          <img
            src={
              user.image
                ? import.meta.env.VITE_API_BASE_URL + user.image
                : user.type === "job_seeker"
                ? getRandomInitailsImage(user.name)
                : "/ghost-company.jpg"
            }
            className="rounded-full"
            width={32}
            height={32}
            alt={user.name}
          />
          <TypographyP className="text-sm">
            <b>Messaging</b>
          </TypographyP>
        </div>
        {minimized ? (
          <GoChevronUp {...iconProps} />
        ) : (
          <GoChevronDown {...iconProps} />
        )}
      </div>
      {active ? (
        <MessageDetails
          size="sm"
          id={active}
          onClose={() => setActive(null)}
          onDelete={() => setActive(null)}
        />
      ) : (
        <AllMessages onMessageClick={setActive} />
      )}
    </div>
  );
};

export default MessagesBar;
