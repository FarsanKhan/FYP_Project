import React from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { cn, formatCreatedAt, getRandomInitailsImage } from "../../lib/utils";

const MessageListItem = ({
  onClick,
  self,
  isActive,
  user,
  message,
  createdAt,
  size,
}) => {
  return (
    <div
      className={cn(
        "job-card flex p-3 border-b border-b-neutral-200 items-start cursor-pointer gap-3 hover:bg-neutral-100",
        isActive ? "jobs-list-item-active" : "",
        message && message.user.id !== self.id && !message.read
          ? "bg-[#edf3f8]"
          : ""
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "rounded-full overflow-hidden",
          size === "sm" ? "w-[38px] h-[38px]" : "w-[50px] h-[50px]"
        )}
      >
        <img
          src={
            user.image
              ? import.meta.env.VITE_API_BASE_URL + user.image
              : user.type === "job_seeker"
              ? getRandomInitailsImage(user.name)
              : "/ghost-company.jpg"
          }
          alt={user.name}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <TypographyP className={size === "sm" ? "text-sm" : "text-base"}>
            {user.name}
          </TypographyP>
          <TypographyP className="text-xs">
            {formatCreatedAt(
              message && message.createdAt ? message.createdAt : createdAt
            )}
          </TypographyP>
        </div>
        <TypographyMuted
          className={cn(
            "overflow-hidden text-ellipsis w-full",
            size === "sm" ? "text-xs" : "text-sm"
          )}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {message
            ? `${
                message.user.id === self.id ? "You: " : `${message.user.name}: `
              } ${message.text?.replace(
                /(<[a-z][^>]*>|<\/[a-z]+>|<[a-z][^>]*\/>|&nbsp;)/g,
                ""
              )}`
            : ""}
        </TypographyMuted>
      </div>
    </div>
  );
};

export default MessageListItem;
