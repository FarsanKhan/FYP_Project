import React, { useRef, useState } from "react";
import { useStore } from "../../lib/store";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  followCompany,
  getCompanyFollowerStats,
  unfollowCompany,
  uploadUserImage,
} from "../../api";
import { TypographyH3, TypographyMuted, TypographyP } from "../ui/typography";
import { Button, LoaderButton } from "../ui/button";
import { Pen } from "lucide-react";
import { cn, getRandomInitailsImage, iconProps } from "../../lib/utils";
import IntroModal from "./IntroModal";
import FollowersModal from "./FollowersModal";
import { Link } from "react-router-dom";

const ProfileInfo = ({ profileUser, id, user }) => {
  const ref = useRef();
  const queryClient = useQueryClient();
  const updateUser = useStore((state) => state.updateUser);
  const [intro, setIntro] = useState(false);
  const [follower, setFollower] = useState(false);

  const { data: company } = useQuery({
    queryKey: ["company-followers-" + profileUser.id],
    queryFn: () => getCompanyFollowerStats(profileUser.id),
    enabled: profileUser.type === "employer",
  });

  const followCompanyMutation = useMutation({
    mutationFn: followCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-followers-" + profileUser.id],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  const unfollowCompanyMutation = useMutation({
    mutationFn: unfollowCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-followers-" + profileUser.id],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const toggleFollow = () => {
    if (company.isFollowing) {
      unfollowCompanyMutation.mutate(profileUser.id);
    } else {
      followCompanyMutation.mutate(profileUser.id);
    }
  };

  const uploadUserImageMutation = useMutation({
    mutationFn: uploadUserImage,
    onSuccess: ({ image }) => {
      updateUser({ ...user, image });
      queryClient.invalidateQueries({ queryKey: ["user-" + profileUser.id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onImageUpload = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    uploadUserImageMutation.mutate(formData);
  };
  return (
    <>
      <div className="relative rounded-md border border-neutral-200">
        <div className="h-64 bg-slate-100" />
        <div
          className={cn(
            "top-44 left-8 absolute",
            user.id == id ? "cursor-pointer" : ""
          )}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-[130px] h-[130px] rounded-full overflow-hidden">
              <img
                onClick={() => {
                  if (user.id == id) ref.current.click();
                }}
                className="h-full w-full object-cover"
                src={
                  profileUser.image
                    ? import.meta.env.VITE_API_BASE_URL + profileUser.image
                    : profileUser.type === "job_seeker"
                    ? getRandomInitailsImage(profileUser.name)
                    : "/ghost-company.jpg"
                }
                alt={profileUser.name}
              />
            </div>
            {uploadUserImageMutation.isPending && (
              <div className="loader-lg absolute z-1" />
            )}
          </div>
        </div>
        <div className="flex justify-between pt-16 pb-8 pl-9 pr-6">
          <div>
            <TypographyH3>{profileUser.name}</TypographyH3>
            <TypographyP className="text-base mt-1">
              {profileUser.type === "job_seeker"
                ? profileUser.headline
                : profileUser.industry}
            </TypographyP>
            <TypographyMuted className="text-base">
              {profileUser.location}
              {profileUser.type === "employer" && (
                <span>
                  {" "}
                  ·{" "}
                  <span
                    className={
                      user.id == id || user.type === "admin"
                        ? "cursor-pointer hover:underline"
                        : ""
                    }
                    onClick={() => {
                      if (user.id == id || user.type === "admin")
                        setFollower(true);
                    }}
                  >
                    {company?.followerCount ?? 0} followers
                  </span>
                </span>
              )}
            </TypographyMuted>
            {profileUser.type === "employer" && (
              <>
                <TypographyMuted className="mt-1">
                  {profileUser.headline}
                </TypographyMuted>
                {user.type === "job_seeker" && (
                  <div className="mt-4 flex items-center gap-3">
                    <Link to={`/app/jobs?query=${profileUser.name}`}>
                      <Button className="min-w-28 bg-blue-500 rounded-full">
                        See jobs
                      </Button>
                    </Link>
                    <LoaderButton
                      isLoading={
                        followCompanyMutation.isPending ||
                        unfollowCompanyMutation.isPending
                      }
                      onClick={toggleFollow}
                      variant="outline"
                      className="min-w-28 border-neutral-600 rounded-full"
                    >
                      {company && company.isFollowing ? "Following" : "Follow"}
                    </LoaderButton>
                  </div>
                )}
              </>
            )}
          </div>
          {user.id == id ? (
            <Button variant="ghost" size="icon" onClick={() => setIntro(true)}>
              <Pen size="1.35em" color={iconProps.color} />
            </Button>
          ) : (
            <div className="w-[40px] h-[40px]" />
          )}
        </div>
        <input
          ref={ref}
          multiple={false}
          className="hidden"
          type="file"
          name="file"
          onChange={onImageUpload}
          accept=".png,.jpg,.jpeg"
        />
      </div>
      {follower && (
        <FollowersModal user={profileUser} onClose={() => setFollower(false)} />
      )}
      {intro && <IntroModal onClose={() => setIntro(false)} />}
    </>
  );
};
export default ProfileInfo;
