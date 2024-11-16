import React, { useState } from "react";
import { useStore } from "../../lib/store";
import { cn, iconProps } from "../../lib/utils";
import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "../ui/typography";
import { Button } from "../ui/button";
import { Pen, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api";
import AboutModal from "./AboutModal";
// import IntroModal from "./IntroModal";
import SkillsModal from "./SkillsModal";
import PostList from "../Dashboard/PostList";
import ProfileJobList from "./ProfileJobList";
import ProfileInfo from "./ProfileInfo";

const options = [
  { label: "Overview", value: "overview" },
  { label: "Jobs", value: "jobs" },
];

const Profile = ({ className, onJobClick }) => {
  const { id } = useParams();
  const { data: profileUser, isPending } = useQuery({
    queryKey: ["user-" + id],
    queryFn: () => getUser(id),
  });
  const [active, setActive] = useState("overview");
  const user = useStore((state) => state.user);
  const [about, setAbout] = useState(false);
  const [skills, setSkills] = useState(null);

  return (
    <>
      <div
        className={cn(
          "w-full bg-white h-full flex flex-col pt-24 px-48",
          className
        )}
      >
        {profileUser ? (
          <>
            <ProfileInfo profileUser={profileUser} id={id} user={user} />
            <div className="px-4 py-8">
              <div className="flex items-center gap-6 border-b border-b-neutral-200">
                {options
                  .filter((option) => {
                    if (option.value === "jobs") {
                      return profileUser.type === "employer";
                    }
                    return true;
                  })
                  .map((option) => (
                    <div
                      key={option.value}
                      onClick={() => setActive(option.value)}
                      className={cn(
                        "!min-w-fit w-fit px-2 py-3 relative h-full justify-center icon-nav cursor-pointer flex flex-col items-center",
                        active === option.value ? "active" : ""
                      )}
                    >
                      <TypographyP className="text-base font-semibold">
                        {option.label}
                      </TypographyP>
                    </div>
                  ))}
              </div>
              {active === "overview" ? (
                <div className="pt-8">
                  <div
                    className={cn(
                      "pb-6 about-us-profile",
                      profileUser.type === "employer"
                        ? "border-b border-b-neutral-200"
                        : ""
                    )}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <TypographyH3 className="font-normal">
                        {profileUser.type === "job_seeker"
                          ? "About"
                          : "About us"}
                      </TypographyH3>
                      {user.id == id ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setAbout(true)}
                        >
                          <Pen size="1.35em" color={iconProps.color} />
                        </Button>
                      ) : (
                        <div className="w-[40px] h-[40px]" />
                      )}
                    </div>
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: profileUser.about || "-",
                      }}
                    />
                    {profileUser.type === "job_seeker" && (
                      <div className="mt-7">
                        <div className="flex items-center justify-between">
                          <TypographyH4>Skills</TypographyH4>
                          {user.id == id ? (
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSkills({ type: "add" })}
                              >
                                <Plus color={iconProps.color} />
                              </Button>
                              {user.skills && user.skills.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setSkills({ type: "edit" })}
                                >
                                  <Pen size="1.35em" color={iconProps.color} />
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div className="w-[40px] h-[40px]" />
                          )}
                        </div>
                        {user.skills ? (
                          <div className="mt-4 flex-col flex">
                            {user.skills.slice(0, 2).map((s, index) => (
                              <TypographyP
                                className={cn(
                                  "font-semibold py-3",
                                  index !== 1
                                    ? "border-b border-b-neutral-200"
                                    : ""
                                )}
                              >
                                {s}
                              </TypographyP>
                            ))}
                            {user.skills.length > 2 && (
                              <TypographyMuted
                                onClick={() => setSkills({ type: "edit" })}
                                className="pt-3 hover:underline cursor-pointer border-t border-t-neutral-200"
                              >
                                Show all {user.skills.length} skills
                              </TypographyMuted>
                            )}
                          </div>
                        ) : (
                          <TypographyMuted>No skills found.</TypographyMuted>
                        )}
                      </div>
                    )}
                  </div>
                  {profileUser.type === "employer" && (
                    <div className="pt-5">
                      <TypographyH3 className="font-normal">
                        Updates
                      </TypographyH3>
                      <div className="mt-3">
                        <PostList
                          isProfileView
                          isOwner={user.id == id}
                          userId={id}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <ProfileJobList onJobClick={onJobClick} user={profileUser} />
              )}
            </div>
          </>
        ) : isPending ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="loader-lg"></div>
          </div>
        ) : null}
      </div>
      {skills && (
        <SkillsModal
          isEdit={skills.type === "edit"}
          onClose={() => setSkills(null)}
        />
      )}
      {about && <AboutModal onClose={() => setAbout(false)} />}
    </>
  );
};

export default Profile;
