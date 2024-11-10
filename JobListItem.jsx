import React from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { cn, iconProps } from "../../lib/utils";
import { GoAlert } from "react-icons/go";
import BaseTooltip from "../../components/ui/BaseTooltip";

const JobListItem = ({
  title,
  location,
  status,
  company,
  paid,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={cn(
        "job-card focus:bg-blue-50 flex items-center justify-between px-4 py-3 cursor-pointer",
        isActive ? "jobs-list-item-active" : ""
      )}
      style={status == 2 ? { background: "rgba(242, 179, 68, 0.10)" } : {}}
      onClick={onClick}
    >
      <div className="flex items-start  gap-3">
        <div className="w-[56px] h-[56px]">
          <img
            src={
              company.image
                ? import.meta.env.VITE_API_BASE_URL + company.image
                : "/ghost-company.jpg"
            }
            alt={company.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <TypographyP className="job-title text-blue-500 text-base leading-none">
            <b>{title}</b>
          </TypographyP>
          <TypographyP className="text-sm">{company.name}</TypographyP>
          <TypographyMuted className="text-sm">{location}</TypographyMuted>
          {paid && (
            <TypographyMuted className="text-sm">Sponsored</TypographyMuted>
          )}
        </div>
      </div>
      {status == 2 ? (
        <BaseTooltip
          tooltip={
            <p>
              This job post has been disabled by the website <br /> admin due to
              multiple reports.
            </p>
          }
        >
          <span>
            <GoAlert {...iconProps} size="1.25em" />
          </span>
        </BaseTooltip>
      ) : null}
    </div>
  );
};
export default JobListItem;
