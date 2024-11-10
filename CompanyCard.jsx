import React from "react";
import { TypographyH4, TypographyMuted, TypographyP } from "../ui/typography";
import { LoaderButton } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  followCompany,
  getCompanyFollowerStats,
  unfollowCompany,
} from "../../api/user";
import toast from "react-hot-toast";
import { GoCheck, GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";

const CompanyCard = ({ data }) => {
  const queryClient = useQueryClient();

  const { data: company, isPending } = useQuery({
    queryKey: ["company-followers-" + data.company.id],
    queryFn: () => getCompanyFollowerStats(data.company.id),
  });

  const followCompanyMutation = useMutation({
    mutationFn: followCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-followers-" + data.company.id],
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
        queryKey: ["company-followers-" + data.company.id],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const toggleFollow = () => {
    if (company.isFollowing) {
      unfollowCompanyMutation.mutate(data.company.id);
    } else {
      followCompanyMutation.mutate(data.company.id);
    }
  };

  return (
    <div className="p-5 mb-3 relative rounded-md lined-box-shadow gap-6 flex flex-col">
      {isPending && (
        <div className="z-1 bg-opacity-20 bg-neutral-50 top-0 left-0 absolute w-full h-full flex items-center justify-center">
          <div className="loader-lg"></div>
        </div>
      )}
      <TypographyH4>About the company</TypographyH4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={
              data.company.image
                ? import.meta.env.VITE_API_BASE_URL + data.company.image
                : "/ghost-company.jpg"
            }
            alt={data.company.name}
            width={72}
            height={72}
          />
          <div>
            <Link to={`/app/profile/${data.company.id}`}>
              <TypographyP className="text-base font-semibold hover:underline">
                {data.company.name}
              </TypographyP>
            </Link>
            <TypographyMuted className="text-sm">
              {company?.followerCount ?? 0} followers
            </TypographyMuted>
          </div>
        </div>
        <LoaderButton
          size="sm"
          variant="ghost"
          isLoading={
            followCompanyMutation.isPending || unfollowCompanyMutation.isPending
          }
          onClick={toggleFollow}
          className="h-8 min-w-[90px] border border-blue-500 text-blue-500 rounded-full"
        >
          {company && company.isFollowing ? (
            <>
              <GoCheck size="1.25em" className="mr-1" />
              Following
            </>
          ) : (
            <>
              <GoPlus size="1.25em" className="mr-1" />
              Follow
            </>
          )}
        </LoaderButton>
      </div>
      <div>
        <TypographyMuted>
          Turing accelerates AGI advancement and deployment for leading AI,
          tech, and enterprise companies by improving LLM performance and
          building custom genAI applications. Trusted ...
        </TypographyMuted>
      </div>
    </div>
  );
};

export default CompanyCard;
