import React, { useState } from "react";
import { TypographyP } from "../ui/typography";
import { followCompany, getUserFeed, unfollowCompany } from "../../api/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import Empty from "../ui/Empty";
import SuggestionListItem from "./SuggestionListItem";

const FollowingSuggestion = () => {
  const [following, setFollowing] = useState([]);
  const { data: companies, isPending } = useQuery({
    queryKey: ["feed"],
    refetchOnMount: true,
    queryFn: getUserFeed,
  });

  const followCompanyMutation = useMutation({
    mutationFn: followCompany,
  });

  const unfollowCompanyMutation = useMutation({
    mutationFn: unfollowCompany,
  });

  const toggleFollow = (companyId) => {
    const tmp = [...following];
    if (following.includes(companyId)) {
      tmp.splice(tmp.indexOf(companyId), 1);
      unfollowCompanyMutation.mutate(companyId);
    } else {
      tmp.push(companyId);
      followCompanyMutation.mutate(companyId);
    }
    setFollowing(tmp);
  };

  return (
    <div
      className="px-4 min-h-[180px] pt-3 bg-white rounded-md lined-box-shadow"
      style={{ flex: 0.25 }}
    >
      <TypographyP className="mb-4 text-base font-semibold">
        Add to your feed
      </TypographyP>
      {companies && companies.length > 0 ? (
        <div className="flex flex-col gap-1">
          {companies.map((company) => (
            <SuggestionListItem
              isFollowing={following.includes(company.id)}
              company={company}
              onFollow={() => toggleFollow(company.id)}
            />
          ))}
        </div>
      ) : (
        <div className="min-h-[100px] flex items-center justify-center w-full h-full">
          {isPending ? (
            <div className="loader-lg"></div>
          ) : (
            <Empty
              entity="feed"
              iconContainerClassName="w-20 h-20"
              message="Come back later, to find more companies."
              messageClassName="text-sm"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FollowingSuggestion;
