import React from "react";
import { Link } from "react-router-dom";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { Button } from "../ui/button";
import { GoCheck, GoPlus } from "react-icons/go";

const SuggestionListItem = ({ isFollowing, company, onFollow }) => {
  return (
    <div className="mb-4">
      <div className="flex items-start gap-3">
        <Link key={company.id} to={`/app/profile/${company.id}`}>
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
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
        </Link>
        <div className="flex flex-col gap-2">
          <Link key={company.id} to={`/app/profile/${company.id}`}>
            <TypographyP className="font-semibold text-sm leading-none mb-1">
              {company.name}
            </TypographyP>
            <TypographyMuted className="text-xs">
              Company • {company.industry || "Software Development"}
            </TypographyMuted>
          </Link>
          <Button
            onClick={onFollow}
            size="sm"
            variant="ghost"
            className="h-8 w-fit border border-black rounded-full"
          >
            {isFollowing ? (
              <>
                <GoCheck size="1.25em" className="mr-1" />
                Following
              </>
            ) : (
              <>
                <GoPlus size="1.25em" />
                Follow
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionListItem;
