import React from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { cn } from "../../lib/utils";
import moment from "moment";

const JobListItem = ({
  title,
  className,
  location,
  company,
  onClick,
  isActive,
  createdAt,
  showCreatedAt,
}) => {
  return (
    <div
      className={cn(
        "job-card focus:bg-blue-50 flex p-3 cursor-pointer items-start gap-3",
        isActive ? "jobs-list-item-active" : "",
        className
      )}
      onClick={onClick}
    >
      <img
        src={
          company.image
            ? import.meta.env.VITE_API_BASE_URL + company.image
            : "/ghost-company.jpg"
        }
        alt={company.name}
        width={48}
        height={48}
      />
      <div>
        <TypographyP className="job-title text-base leading-none">
          <b>{title}</b>
        </TypographyP>
        <TypographyP className="text-sm mt-[4px]">{company.name}</TypographyP>
        <TypographyMuted className="text-sm">{location}</TypographyMuted>
        <TypographyMuted className="text-xs mt-[3px]">
          {moment(createdAt).fromNow()}
        </TypographyMuted>
      </div>
    </div>
  );
};
export default JobListItem;
