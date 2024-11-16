import React from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";
import moment from "moment";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const ResultPostItem = ({ user, createdAt, content, isLast }) => {
  return (
    <div
      className={cn(
        "bg-white w-full",
        isLast ? "" : "border-b border-b-neutral-200 pb-5"
      )}
    >
      <div>
        <div className="flex justify-between">
          <div className="flex items-start gap-2">
            <img
              src={
                user.image
                  ? import.meta.env.VITE_API_BASE_URL + user.image
                  : "/ghost-company.jpg"
              }
              alt={user.name}
              width={32}
              height={32}
            />
            <div>
              <Link to={`/app/profile/${user.id}`}>
                <TypographyP className="hover:underline text-sm leading-none">
                  {user.name}
                </TypographyP>
              </Link>
              <TypographyMuted className="text-xs">
                {user.followers || 0} followers
              </TypographyMuted>
              <TypographyMuted className="text-xs">
                {moment(createdAt).fromNow()}
              </TypographyMuted>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-sm pt-2"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ResultPostItem;
