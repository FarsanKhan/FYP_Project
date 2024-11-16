import React, { useMemo } from "react";
import { cn, getElapsedTime, getRandomInitailsImage } from "../../lib/utils";
import Dropdown from "../ui/Dropdown";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { TypographyMuted } from "../ui/typography";

const ownerOptions = [
  {
    label: "Delete notification",
    value: "delete",
  },
];

const transformNotification = (notification) => {
  let text = notification.text;
  if (notification.text.includes("Your application")) {
    text = notification.job
      ? notification.text.replace(
          "Your application",
          "Your application for " + `<b>${notification.job.title}</b>`
        )
      : "This job post has been deleted by the employer.";
  } else if (
    notification.text.includes("User has applied") ||
    notification.text.includes("disabled your job post")
  ) {
    text = notification.job
      ? notification.text
          .replace("User", `<b>${notification.user.name}</b>`)
          .replace("job post", `job post <b>${notification.job.title}</b>`)
      : "This job post has been deleted by the employer.";
  } else if (notification.text.includes("disabled your post")) {
    text = notification.post
      ? notification.text.replace(
          "your post",
          `your post <p class="overflow-hidden text-ellipsis whitespace-nowrap w-64 font-semibold">${notification.post.content.replace(
            /(<[a-z][^>]*>|<\/[a-z]+>|<[a-z][^>]*\/>|&nbsp;)/g,
            ""
          )}</p>`
        )
      : "This post has been deleted.";
  } else if (notification.text.includes("A company you follow")) {
    text = notification.job
      ? notification.text
          .replace(
            "A company you follow",
            `<b>${notification.user?.name ?? ""}</b>`
          )
          .replace(
            "job opening.",
            `job opening for <b>${notification.job.title}</b>.`
          )
      : "This job post has been deleted by the employer.";
  }

  return text;
};

const Notification = ({ notification, onClick, onAction }) => {
  const disabled = useMemo(
    () =>
      (notification.text.includes("Your application") && !notification.job) ||
      (notification.text.includes("A company you follow") &&
        !notification.job) ||
      (notification.text.includes("disabled your post") &&
        !notification.post) ||
      ((notification.text.includes("User has applied") ||
        notification.text.includes("disabled your job post")) &&
        !notification.job),
    [notification]
  );

  return (
    <div
      onClick={(event) => {
        if (disabled) {
        } else if (event.target.textContent !== "Delete notification") {
          onClick();
        }
      }}
      className={cn(
        "border-b border-b-neutral-200 px-4 py-3 flex items-center justify-between",
        disabled ? "opacity-50" : "cursor-pointer hover:bg-neutral-100"
      )}
    >
      <div className="flex items-center gap-3">
        {!disabled && (
          <img
            src={
              notification.user.image
                ? import.meta.env.VITE_API_BASE_URL + notification.user.image
                : notification.user.type === "job_seeker"
                ? getRandomInitailsImage(notification.user)
                : "/ghost-company.jpg"
            }
            alt={notification.user.name}
            className="rounded-full"
            width={40}
            height={40}
          />
        )}
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: transformNotification(notification),
          }}
        />
      </div>
      <div className="flex flex-col items-center">
        <TypographyMuted className="text-xs">
          {getElapsedTime(notification.createdAt)}
        </TypographyMuted>
        <Dropdown
          trigger={
            <Button className="w-8 h-8" variant="ghost" size="icon">
              <Ellipsis size="1.325em" />
            </Button>
          }
          options={ownerOptions}
          onAction={onAction}
        />
      </div>
    </div>
  );
};

export default Notification;
