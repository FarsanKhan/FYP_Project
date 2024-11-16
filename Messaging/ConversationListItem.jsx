import React from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { cn, formatCreatedAt, getRandomInitailsImage } from "../../lib/utils";

const ConversationListItem = ({ user, text, createdAt, size }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        size === "sm" ? "px-1 py-2" : "p-3"
      )}
    >
      <div className="rounded-full overflow-hidden w-[35px] h-[35px]">
        <img
          src={
            user.image
              ? import.meta.env.VITE_API_BASE_URL + user.image
              : user.type === "job_seeker"
              ? getRandomInitailsImage(user.name)
              : "/ghost-company.jpg"
          }
          alt={user.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex gap-1 items-center">
          <TypographyP className="text-sm">
            <b>{user.name}</b>
          </TypographyP>
          <TypographyMuted className="text-xs">
            • {formatCreatedAt(createdAt)}
          </TypographyMuted>
        </div>
        <div className="text-sm" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
};

export default ConversationListItem;
