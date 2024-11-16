import React from "react";
import { TypographyH3, TypographyMuted, TypographyP } from "../ui/typography";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import moment from "moment";
import { getJobs } from "../../api";
import Empty from "../ui/Empty";

const ProfileJobListItem = ({ user, job, onClick }) => {
  return (
    <div
      className="profile-job-list-item flex gap-4 items-start mb-6 cursor-pointer"
      onClick={onClick}
    >
      <img
        className="mt-1"
        height={40}
        width={40}
        src={
          user.image
            ? import.meta.env.VITE_API_BASE_URL + user.image
            : "/ghost-company.jpg"
        }
        alt={user.name}
      />
      <div className="flex flex-col">
        <TypographyP className="font-semibold profile-job-list-item-title">
          {job.title}
        </TypographyP>
        <TypographyP className="text-sm">{user.name}</TypographyP>
        <TypographyMuted>{job.location}</TypographyMuted>
        <TypographyP className="text-green-700 font-semibold text-sm">
          {moment(job.createdAt).fromNow()}
        </TypographyP>
      </div>
    </div>
  );
};

const ProfileJobList = ({ user, onJobClick }) => {
  const { data, isPending } = useQuery({
    queryKey: ["jobs-" + user.id],
    queryFn: () => getJobs({ userId: user.id }),
  });

  return (
    <div className="pt-9">
      <TypographyH3 className="font-normal">Jobs at {user.name}</TypographyH3>
      <div className="mt-3">
        {isPending ? (
          <div className="loader-lg"></div>
        ) : data.results.length > 0 ? (
          data.results.map((job) =>
            onJobClick ? (
              <ProfileJobListItem
                key={job.id}
                user={user}
                job={job}
                onClick={() => onJobClick(job)}
              />
            ) : (
              <Link to={`/app/jobs/${job.id}`} key={job.id}>
                <ProfileJobListItem user={user} job={job} />
              </Link>
            )
          )
        ) : (
          <Empty message="No jobs found." entity="jobs" />
        )}
      </div>
    </div>
  );
};

export default ProfileJobList;
