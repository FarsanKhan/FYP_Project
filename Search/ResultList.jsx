import React, { useState } from "react";
import { TypographyH4, TypographyP } from "../ui/typography";
import { cn } from "../../lib/utils";
import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../../api/search";
import JobListItem from "./ResultJobItem";
import PostListItem from "./ResultPostItem";
import Empty from "../ui/Empty";
import CompanyListItem from "./CompanyListItem";

const items = [
  {
    label: "Jobs",
    value: "jobs",
  },
  {
    label: "Posts",
    value: "posts",
  },
  {
    label: "Companies",
    value: "companies",
  },
];

const ResultList = () => {
  const location = useLocation();
  const filters = { ...queryString.parse(location.search) };
  const [active, setActive] = useState("jobs");

  const { data, isPending } = useQuery({
    queryKey: ["search-results", filters],
    queryFn: () => getSearchResults(filters),
  });

  const queryURL = (url) => queryString.stringifyUrl({ url, query: filters });

  const navigateToItem = (item) => {
    window.scrollTo({
      top: document.getElementById(`result-${item}`).offsetTop - 117,
      behavior: "smooth",
    });
    setActive(item);
  };

  return (
    <div className="relative flex gap-8 h-full w-full max-w-[70%] pt-24 items-start">
      {isPending && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="loader-lg"></div>
        </div>
      )}
      {data && items.some((i) => data[i.value] && data[i.value].length > 0) ? (
        <>
          <div className="bg-white rounded-md py-2 lined-box-shadow flex-[0.25] sticky top-24">
            <TypographyH4 className="px-3 py-2 mb-2">On this page</TypographyH4>
            <div>
              {items
                .filter(
                  (item) => data[item.value] && data[item.value].length > 0
                )
                .map((item) => (
                  <div
                    className={cn(
                      "!bg-white mb-4 job-card px-4 hover:bg-neutral-100 cursor-pointer",
                      active === item.value ? "jobs-list-item-active" : ""
                    )}
                    onClick={() => navigateToItem(item.value)}
                  >
                    <TypographyP className="text-sm">{item.label}</TypographyP>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex-1">
            {items
              .filter((item) => data[item.value] && data[item.value].length > 0)
              .map((item) => (
                <div
                  className="bg-white rounded-md lined-box-shadow mb-5"
                  id={`result-${item.value}`}
                >
                  <div className="px-5 py-4">
                    <TypographyH4>{item.label}</TypographyH4>
                    <div className="mt-2">
                      {data[item.value].slice(0, 3).map((v, index) => (
                        <div className="py-2">
                          {item.value === "jobs" ? (
                            <Link to={queryURL(`/app/jobs/${v.id}`)} key={v.id}>
                              <JobListItem
                                {...v}
                                className="p-0 search-results-job"
                                showCreatedAt
                              />
                            </Link>
                          ) : item.value === "posts" ? (
                            <PostListItem
                              {...v}
                              key={v.id}
                              isLast={
                                index ===
                                data[item.value].slice(0, 3).length - 1
                              }
                            />
                          ) : (
                            <Link to={`/app/profile/${v.id}`}>
                              <CompanyListItem company={v} key={v.id} />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {data[item.value].length > 3 && (
                    <Link
                      to={queryURL(
                        item.value === "jobs"
                          ? `/app/jobs`
                          : "/app/search/results/" + item.value
                      )}
                    >
                      <div className="hover:bg-neutral-100 cursor-pointer p-3 border-t border-t-neutral-200 flex items-center justify-center">
                        <TypographyP className="font-semibold">
                          See all {item.value} results
                        </TypographyP>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Empty entity="search" message="No matching results found." />
        </div>
      )}
    </div>
  );
};

export default ResultList;
