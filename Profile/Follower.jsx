import React from "react";
import { cn, getRandomInitailsImage } from "../../lib/utils";
import { TypographyP } from "../ui/typography";

const Follower = ({ isClickable, name, image, headline }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        isClickable ? "cursor-pointer profile-job-list-item" : ""
      )}
    >
      <img
        src={
          image
            ? import.meta.env.VITE_API_BASE_URL + image
            : getRandomInitailsImage(name)
        }
        width={48}
        height={48}
        className="rounded-full"
        alt={name}
      />
      <div>
        <TypographyP
          className={cn(
            "font-semibold",
            isClickable ? "profile-job-list-item-title" : ""
          )}
        >
          {name}
        </TypographyP>
        <TypographyP className="text-sm">{headline}</TypographyP>
      </div>
    </div>
  );
};

export default Follower;
