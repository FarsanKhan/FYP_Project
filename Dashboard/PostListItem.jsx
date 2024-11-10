import React from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";
import moment from "moment";
import Dropdown from "../ui/Dropdown";
import { Button } from "../ui/button";
import { Edit, Ellipsis } from "lucide-react";
import { GoTrash } from "react-icons/go";
import { FaFlag } from "react-icons/fa6";
import { iconProps } from "../../lib/utils";
import { Link } from "react-router-dom";
import WarningBanner from "../ui/WarningBanner";

const ownerOptions = [
  {
    label: "Edit post",
    value: "edit",
    icon: <Edit {...iconProps} size="1.25em" className="mr-2" />,
  },
  {
    label: "Delete post",
    value: "delete",
    icon: <GoTrash {...iconProps} size="1.25em" className="mr-2" />,
  },
];

const options = [
  {
    label: "Report this post",
    value: "report",
    icon: <FaFlag {...iconProps} size="1.25em" className="mr-2" />,
  },
];

const PostListItem = ({
  user,
  status,
  createdAt,
  content,
  isOwner,
  onAction,
  isAdmin,
  adminOptions,
}) => {
  return (
    <div className="py-4 mb-3 rounded-md lined-box-shadow bg-white w-full">
      <div className="px-4">
        {status === 2 && !isAdmin && (
          <WarningBanner
            className="mb-4"
            message="This post has been disabled by the website admin due to multiple
              reports."
          />
        )}
        <div className="flex justify-between">
          <div className="flex items-start gap-2">
            <div className="w-[32px] h-[32px] overflow-hidden">
              <img
                src={
                  user.image
                    ? import.meta.env.VITE_API_BASE_URL + user.image
                    : "/ghost-company.jpg"
                }
                alt={user.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <Link
                to={
                  isAdmin ? `/app/users/${user.id}` : `/app/profile/${user.id}`
                }
              >
                <TypographyP className="hover:underline text-sm leading-none">
                  {user.name}
                </TypographyP>
              </Link>
              {!isAdmin && (
                <TypographyMuted className="text-xs">
                  {user.followers || 0} followers
                </TypographyMuted>
              )}
              <TypographyMuted className="text-xs">
                {moment(createdAt).fromNow()}
              </TypographyMuted>
            </div>
          </div>
          {!isAdmin || adminOptions ? (
            <Dropdown
              trigger={
                <Button variant="ghost" size="icon">
                  <Ellipsis />
                </Button>
              }
              options={
                adminOptions ? adminOptions : isOwner ? ownerOptions : options
              }
              onAction={onAction}
            />
          ) : null}
        </div>
      </div>
      <div
        className="text-sm px-4 pt-2"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostListItem;
