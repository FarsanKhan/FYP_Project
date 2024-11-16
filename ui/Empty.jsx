import React from "react";
import { TypographyH4 } from "./typography";
import { AiFillMessage, AiFillReconciliation } from "react-icons/ai";
import {
  GoBellFill,
  GoChecklist,
  GoDependabot,
  GoOrganization,
  GoSearch,
} from "react-icons/go";

import { cn, iconProps } from "../../lib/utils";
import { LucideMessagesSquare, PenBoxIcon } from "lucide-react";

const Empty = ({
  entity,
  message,
  action,
  messageClassName,
  iconContainerClassName,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          "w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center",
          iconContainerClassName
        )}
      >
        {entity === "jobs" ? (
          <AiFillReconciliation {...iconProps} size="4em" />
        ) : entity === "feedbacks" ? (
          <GoChecklist {...iconProps} size="4em" />
        ) : entity === "applicants" ? (
          <GoDependabot {...iconProps} size="4em" />
        ) : entity === "posts" ? (
          <PenBoxIcon {...iconProps} size="4em" />
        ) : entity === "feed" ? (
          <GoOrganization {...iconProps} size="3em" />
        ) : entity === "messages" ? (
          <AiFillMessage {...iconProps} size="3em" />
        ) : entity === "notifications" ? (
          <GoBellFill {...iconProps} size="4em" />
        ) : entity === "search" ? (
          <GoSearch {...iconProps} size="4em" />
        ) : entity === "meeting-messages" ? (
          <LucideMessagesSquare {...iconProps} size="4em" />
        ) : null}
      </div>
      <TypographyH4 className={cn("text-center", messageClassName)}>
        {message}
      </TypographyH4>
      {action}
    </div>
  );
};

export default Empty;
