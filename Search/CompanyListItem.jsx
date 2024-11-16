import React from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";

const CompanyListItem = ({ company }) => {
  return (
    <div className="cursor-pointer job-card flex items-start gap-3">
      <div className="rounded-full w-[40px] h-[40px] overflow-hidden">
        <img
          src={
            company.image
              ? import.meta.env.VITE_API_BASE_URL + company.image
              : "/ghost-company.jpg"
          }
          alt={company.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <TypographyP className="job-title font-semibold leading-none mb-1">
            {company.name}
          </TypographyP>
          <TypographyP className="text-sm">
            {company.industry || "Company"} • {company.location}
          </TypographyP>
          <TypographyMuted className="text-sm">
            {company.followers} followers
          </TypographyMuted>
          <TypographyMuted className="text-sm">
            {company.headline}
          </TypographyMuted>
        </div>
      </div>
    </div>
  );
};

export default CompanyListItem;
