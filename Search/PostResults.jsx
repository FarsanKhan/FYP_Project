import React from "react";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { getSearchPosts } from "../../api/search";
import Empty from "../ui/Empty";
import { TypographyMuted } from "../ui/typography";
import ResultPostItem from "../Dashboard/PostListItem";

const PostResults = () => {
  const location = useLocation();
  const filters = {
    ...queryString.parse(location.search),
  };

  const { data, isPending } = useQuery({
    queryKey: ["search-results-posts", filters],
    queryFn: () => getSearchPosts(filters),
  });

  return (
    <div className="relative flex gap-8 h-full w-full max-w-[70%] pt-24 items-start">
      {isPending && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="loader-lg"></div>
        </div>
      )}
      {data ? (
        <>
          <div className="flex-1">
            <TypographyMuted className="mb-2">
              About {data.count} results
            </TypographyMuted>
            {data.results.map((item) => (
              <div className="mb-2">
                <ResultPostItem {...item} key={item.id} />
              </div>
            ))}
          </div>
        </>
      ) : !isPending ? (
        <div className="w-full h-full flex items-center justify-center">
          <Empty entity="search" message="No matching results found." />
        </div>
      ) : null}
    </div>
  );
};

export default PostResults;
