import React from "react";
import { WorkplaceTypesMap } from "../../lib/utils";
import { TypographyMuted, TypographyP } from "../ui/typography";

const JobPreviewCard = ({ user, title, location, workplaceType }) => {
  return (
    <div className="gap-4 p-3 flex flex-col bg-white rounded-md lined-box-shadow">
      <div className="flex items-start gap-3">
        <img
          src={
            user.image
              ? import.meta.env.VITE_API_BASE_URL + user.image
              : "/ghost-company.jpg"
          }
          alt={user.name}
          width={48}
          height={48}
        />
        <div>
          <TypographyP className="font-semibold text-base leading-none">
            {title}
          </TypographyP>
          <TypographyP className="text-sm">{user.name}</TypographyP>
          <TypographyMuted className="text-sm">{location}</TypographyMuted>
          <TypographyMuted className="text-sm">
            ({WorkplaceTypesMap[workplaceType]})
          </TypographyMuted>
        </div>
      </div>
    </div>
  );
};

export default JobPreviewCard;
