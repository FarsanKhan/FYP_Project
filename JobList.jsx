import React, { useEffect } from "react";
import { TypographyP } from "../ui/typography";
import { GoBookmarkFill } from "react-icons/go";
import { AiFillReconciliation } from "react-icons/ai";
import { cn } from "../../lib/utils";
import JobDetails from "./JobDetails";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import JobListItem from "./JobListItem";
import { useStore } from "../../lib/store";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../api/job";
import Empty from "../ui/Empty";
import { Button } from "../ui/button";
import queryString from "query-string";

const cats = [
  {
    label: "All jobs",
    value: "all",
    icon: <AiFillReconciliation size="1.25em" />,
  },
  {
    label: "My jobs",
    value: "my",
    icon: <GoBookmarkFill size="1.25em" />,
  },
];

const JobList = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const filters = {
    type: "all",
    ...queryString.parse(location.search),
  };
  const user = useStore((state) => state.user);

  const { data, isPending } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getJobs(filters),
    refetchOnMount: true,
  });

  const queryURL = (url, _filters = {}) =>
    queryString.stringifyUrl({ url, query: { ...filters, ..._filters } });

  useEffect(() => {
    if (!id && data && data.results.length > 0)
      navigate(queryURL(`/app/jobs/${data.results[0].id}`));
  }, [data]);

  return (
    <div
      className="bg-white overflow-hidden flex items-start w-full mt-14 max-w-[100%]"
      style={{ height: "calc(100vh - 56px)" }}
    >
      {user.type === "job_seeker" && (
        <div className="pt-1 relative w-56 overflow-hidden border border-r-neutral-100 flex flex-col h-full">
          {cats.map((c) => (
            <Link to={queryURL(`/app/jobs`, { type: c.value })} key={c.value}>
              <div
                className={cn(
                  "p-4 flex items-center gap-3 cursor-pointer hover:bg-neutral-100",
                  filters.type === c.value ? "bg-neutral-100" : ""
                )}
              >
                {c.icon}
                <TypographyP className="text-base">{c.label}</TypographyP>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="overflow-hidden pt-1 flex h-full flex-1">
        <div
          style={{
            flex: data && data.results && data.results.length > 0 ? 0.45 : 1,
          }}
          className="relative overflow-auto h-full border border-r-neutral-200"
        >
          {data && data.results && data.results.length > 0 ? (
            <>
              {data.results.map((job) => (
                <Link key={job.id} to={queryURL(`/app/jobs/${job.id}`)}>
                  <JobListItem {...job} isActive={id == job.id} />
                </Link>
              ))}
              {user.type === "employer" && (
                <div className="absolute bottom-4 flex items-center justify-center w-full">
                  <Button
                    className="text-blue-500 border-blue-500 rounded-full text-md"
                    variant="outline"
                    onClick={() => navigate("/app/jobs/posting")}
                  >
                    <AiFillReconciliation
                      size="1.25em"
                      className="text-blue-500 mr-2"
                    />{" "}
                    Post a job
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex justify-center items-center">
              {isPending ? (
                <div className="loader-lg"></div>
              ) : (
                <Empty
                  entity="jobs"
                  message={
                    filters.query
                      ? "No matching jobs found"
                      : user.type === "job_seeker"
                      ? "We don't have any jobs listed at this time."
                      : "Looking to hire? Start by posting your first job."
                  }
                  action={
                    user.type === "job_seeker" ? null : (
                      <Button
                        className="text-blue-500 border-blue-500 rounded-full text-md"
                        variant="outline"
                        onClick={() => navigate("/app/jobs/posting")}
                      >
                        Post a job
                      </Button>
                    )
                  }
                />
              )}
            </div>
          )}
        </div>
        {id && data && data.results && data.results.length > 0 ? (
          <Routes>
            <Route
              path="/"
              element={
                <JobDetails id={id} filters={filters} type={filters.type} />
              }
            />
          </Routes>
        ) : !isPending && data && data.results && data.results.length > 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty entity="jobs" message="Select a job to view its details." />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JobList;
