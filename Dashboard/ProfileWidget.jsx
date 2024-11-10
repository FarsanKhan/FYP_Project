import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../lib/store";
import { getRandomInitailsImage } from "../../lib/utils";
import { TypographyMuted, TypographyP } from "../ui/typography";

function ProfileWidget() {
  const user = useStore((state) => state.user);
  return (
    <Link to={`/app/profile/${user.id}`} style={{ flex: 0.25 }}>
      <div className="left-side cursor-pointer relative overflow-hidden flex flex-col bg-white rounded-md lined-box-shadow">
        <div className="h-16 bg-slate-100" />
        <div className="top-10 left-3 absolute w-[46px] h-[46px] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={
              user.image
                ? import.meta.env.VITE_API_BASE_URL + user.image
                : user.type === "job_seeker"
                ? getRandomInitailsImage(user.name)
                : "/ghost-company.jpg"
            }
            alt={user.name}
          />
        </div>
        <div className="pt-8 pb-3 px-4">
          <TypographyP className="left-side-title text-base font-semibold">
            {user.name}
          </TypographyP>
          <TypographyMuted className="text-xs">{user.location}</TypographyMuted>
        </div>
      </div>
    </Link>
  );
}
export default ProfileWidget;
