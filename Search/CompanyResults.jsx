import React from "react";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import { getSearchCompanies } from "../../api/search";
import Empty from "../ui/Empty";
import CompanyListItem from "./CompanyListItem";
import { TypographyMuted } from "../ui/typography";

const CompanyResults = () => {
  const location = useLocation();
  const filters = {
    ...queryString.parse(location.search),
  };

  const { data, isPending } = useQuery({
    queryKey: ["search-results-companies", filters],
    queryFn: () => getSearchCompanies(filters),
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
            <div className="bg-white rounded-md lined-box-shadow mb-5">
              {data.results.map((item) => (
                <div className="mb-2 px-5 py-4">
                  <Link to={`/app/profile/${item.id}`}>
                    <div className="py-2">
                      <CompanyListItem company={item} key={item.id} />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
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

export default CompanyResults;
