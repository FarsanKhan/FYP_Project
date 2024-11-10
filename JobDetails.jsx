import React, { useEffect, useState } from "react";
import {
  JobTypesMap,
  WorkplaceTypesMap,
  cn,
  downloadFromURL,
  iconProps,
} from "../../lib/utils";
import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "../ui/typography";
import {
  GoCheckCircleFill,
  GoChecklist,
  GoChevronLeft,
  GoDotFill,
  GoLinkExternal,
  GoOrganization,
  GoTasklist,
  GoTrash,
} from "react-icons/go";
import { Button } from "../ui/button";
import { AiFillReconciliation } from "react-icons/ai";
import JobApplyModal from "./JobApplyModal";
import { Edit, Ellipsis, File } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import FeedbackModal from "./FeedbackModal";
import ReportModal from "./ReportModal";
import { FaFlag } from "react-icons/fa6";
import { useStore } from "../../lib/store";
import { deleteJob, getJob, getJobAnalytics, viewJob } from "../../api/job";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { JobPerformanceChart } from "./JobPerformanceChart";
import { Link, useNavigate } from "react-router-dom";
import AlertDialog from "../ui/AlertDialog";
import toast from "react-hot-toast";
import Applicants from "./Applicants";
import CompanyCard from "./CompanyCard";
import Feedbacks from "./Feedbacks";
import SkillsCard from "./SkillsCard";
import WarningBanner from "../ui/WarningBanner";
import Empty from "../ui/Empty";

const StatusMap = {
  submitted: {
    color: "text-neutral-300",
  },
  approved: {
    color: "text-green-600",
    description:
      "Your application has been approved, an interviewer will contact you shortly.",
  },
  rejected: {
    color: "text-red-600",
    description:
      "Your application has been rejected, don't worry, you can apply to other jobs.",
  },
  scheduled: {
    color: "text-yellow-500",
    description:
      "Your application has been scheduled for a interview, stay tuned for  an interviewer message.",
  },
};

const ownerOptions = [
  {
    label: "Edit job post",
    value: "edit",
    icon: <Edit {...iconProps} size="1.25em" className="mr-2" />,
  },
  {
    label: "Delete job post",
    value: "delete",
    icon: <GoTrash {...iconProps} size="1.25em" className="mr-2" />,
  },
];

const options = [
  {
    label: "Send feedback",
    value: "feedback",
    icon: <Edit {...iconProps} size="1.25em" className="mr-2" />,
  },
  {
    label: "Report this job",
    value: "report",
    icon: <FaFlag {...iconProps} size="1.25em" className="mr-2" />,
  },
];

const JobDetails = ({ id, type, filters, className, onBack }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useStore((state) => state.user);

  const { data, isPending } = useQuery({
    queryKey: ["job-" + id],
    refetchOnMount: true,
    queryFn: () => getJob(id),
  });

  const { data: analytics = [] } = useQuery({
    queryKey: ["job-analytics-" + id],
    queryFn: () => getJobAnalytics(id),
    refetchOnMount: true,
    enabled: user.type === "employer" || user.type === "admin",
  });

  const [apply, setApply] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [report, setReport] = useState(false);
  const [applicant, setApplicant] = useState(false);
  const [jobFeedback, setJobFeedback] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const viweJobMutation = useMutation({
    mutationFn: viewJob,
  });

  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      setDeleteModal(false);
      navigate("/app/jobs");
      queryClient.invalidateQueries({ queryKey: ["jobs", filters] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  useEffect(() => {
    let viewMap = localStorage.getItem("viewMap");
    if (viewMap) {
      viewMap = JSON.parse(viewMap);
    } else {
      viewMap = {};
    }
    if (user.type === "job_seeker" && !viewMap[id]) {
      viweJobMutation.mutate({ jobId: id });
      viewMap[id] = true;
      localStorage.setItem("viewMap", JSON.stringify(viewMap));
    }
  }, [id]);

  const onAction = (option) => {
    if (option.value === "feedback") {
      setJobFeedback(true);
    } else if (option.value === "report") {
      setReport(true);
    } else if (option.value === "edit") {
      navigate("/app/jobs/posting/" + id);
    } else if (option.value === "delete") {
      setDeleteModal(true);
    } else if (option.value === "delete-confirm") {
      deleteJobMutation.mutate(id);
    }
  };

  return (
    <>
      {data && data.id ? (
        <div className={cn("relative flex flex-1", className)}>
          <div
            id="job-details-section"
            className="flex flex-col gap-4 flex-1 p-5 overflow-auto bg-white"
          >
            {data.status === 2 && user.type !== "admin" && (
              <WarningBanner
                message="This job post has been disabled by the website admin due to multiple
              reports."
              />
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {user.type === "admin" && onBack ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="absolute left-[4px]"
                  >
                    <GoChevronLeft {...iconProps} />
                  </Button>
                ) : null}
                <div
                  className={cn(
                    "w-[32px] h-[32px]",
                    user.type === "admin" && onBack ? "ml-8" : ""
                  )}
                >
                  <img
                    src={
                      data.company.image
                        ? import.meta.env.VITE_API_BASE_URL + data.company.image
                        : "/ghost-company.jpg"
                    }
                    alt={data.company.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Link
                  to={
                    user.type === "admin"
                      ? `/app/users/${data.company.id}`
                      : `/app/profile/${data.company.id}`
                  }
                >
                  <TypographyP className="hover:underline text-sm leading-none">
                    <b>{data.company.name}</b>
                  </TypographyP>
                </Link>
              </div>
              {user.type === "admin" || data.company.id != user.id ? (
                <div className="w-[40px] h-[40px]" />
              ) : (
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="icon">
                      <Ellipsis {...iconProps} />
                    </Button>
                  }
                  options={user.type === "job_seeker" ? options : ownerOptions}
                  onAction={onAction}
                />
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <TypographyH3 className="leading-none">
                  {data.title}
                </TypographyH3>
                {data.applicant && type === "my" && (
                  <div
                    onClick={() =>
                      downloadFromURL(
                        import.meta.env.VITE_API_BASE_URL +
                          data.applicant.resume,
                        data.applicant.resume.split("/").slice(-1)[0]
                      )
                    }
                    className="flex font-semibold hover:underline text-blue-600 items-center gap-1 cursor-pointer"
                  >
                    <File size="0.75em" />
                    <TypographyP className="text-xs">
                      Submitted resume
                    </TypographyP>
                  </div>
                )}
              </div>
              <TypographyMuted className="mt-1">
                {data.location} ·{" "}
                {(user.type === "employer" && data.company.id == user.id) ||
                user.type === "admin"
                  ? "Created"
                  : ""}{" "}
                {moment(data.createdAt).fromNow()} ·{" "}
                <span
                  onClick={() => {
                    if (
                      (user.type === "employer" &&
                        data.company.id == user.id) ||
                      user.type === "admin"
                    ) {
                      setFeedback(false);
                      setApplicant(true);
                    }
                  }}
                  className={
                    (user.type === "employer" && data.company.id == user.id) ||
                    user.type === "admin"
                      ? "cursor-pointer hover:underline"
                      : ""
                  }
                >
                  {data.totalApplicants}{" "}
                  {Number(data.totalApplicants) > 1
                    ? "applicants"
                    : "applicant"}
                </span>
              </TypographyMuted>
            </div>
            {(user.type === "employer" && data.company.id == user.id) ||
            user.type === "admin" ? (
              <div
                onClick={() => {
                  setApplicant(false);
                  setFeedback(true);
                }}
                className="flex items-center gap-2 cursor-pointer hover:underline"
              >
                <GoChecklist size="1.25em" color="rgb(0 0 0/.6)" />
                <TypographyP className="text-sm">
                  {data.totalFeedbacks}{" "}
                  {Number(data.totalFeedbacks) > 1 ? "feedbacks" : "feedback"}
                </TypographyP>
              </div>
            ) : null}
            <div className="flex items-center gap-2">
              <AiFillReconciliation size="1.5em" color="rgb(0 0 0/.6)" />
              <TypographyP className="text-sm">
                {WorkplaceTypesMap[data.workplaceType]} ·{" "}
                {JobTypesMap[data.type]}
              </TypographyP>
            </div>
            {data.company.industry && (
              <div className="flex items-center gap-2">
                <GoOrganization size="1.5em" color="rgb(0 0 0/.6)" />
                <TypographyP className="text-sm">
                  {data.company.industry}
                </TypographyP>
              </div>
            )}
            {data.skills && data.skills.length > 0 && (
              <div className="flex items-center gap-2">
                <GoTasklist size="1.5em" color="rgb(0 0 0/.6)" />
                <TypographyP
                  className={cn(
                    "text-sm",
                    user.type === "job_seeker"
                      ? "cursor-pointer hover:underline"
                      : ""
                  )}
                  onClick={() => {
                    if (user.type === "job_seeker") {
                      document.getElementById("job-details-section").scrollTo({
                        top: document.getElementById("skills-section")
                          .offsetTop,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  Skills: {data.skills.join(", ")}
                </TypographyP>
              </div>
            )}
            {data.applicant && type !== "my" ? (
              <div className="flex items-center gap-2">
                <GoCheckCircleFill size="1em" className="text-green-600" />
                <TypographyP className="text-green-600 text-sm">
                  Applied {moment(data.applicant.createdAt).fromNow()}
                </TypographyP>
              </div>
            ) : user.type === "job_seeker" && type !== "my" ? (
              <Button
                onClick={() => setApply(true)}
                className="w-28 bg-blue-500 rounded-full"
              >
                Apply
                <GoLinkExternal className="ml-2" size="1.25em" />
              </Button>
            ) : null}
            {type === "my" && data.applicant && (
              <>
                <TypographyH4>Job activity</TypographyH4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <GoDotFill
                        size="1em"
                        className={
                          StatusMap[data.applicant.applicantStatus]
                            ? StatusMap[data.applicant.applicantStatus].color
                            : "text-neutral-300"
                        }
                      />
                      <TypographyP className="text-sm">
                        Application {data.applicant.applicantStatus}
                      </TypographyP>
                    </div>
                    {StatusMap[data.applicant.applicantStatus] &&
                      StatusMap[data.applicant.applicantStatus].description && (
                        <TypographyMuted className="pl-5">
                          {
                            StatusMap[data.applicant.applicantStatus]
                              .description
                          }
                        </TypographyMuted>
                      )}
                  </div>
                  <TypographyMuted className="text-sm">
                    {moment(data.applicant.updatedAt).fromNow()}
                  </TypographyMuted>
                </div>
              </>
            )}
            <TypographyH4>
              {user.type === "job_seeker" ? "About the job" : "Job description"}
            </TypographyH4>
            <div
              className="text-sm mb-2"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
            {user.type === "job_seeker" ? (
              <>
                {data.skills && data.skills.length > 0 && (
                  <SkillsCard skills={data.skills} />
                )}
                <CompanyCard data={data} />
              </>
            ) : (user.type === "employer" && data.company.id == user.id) ||
              user.type === "admin" ? (
              <>
                <TypographyH4>Job performance</TypographyH4>
                <JobPerformanceChart chartData={analytics} />
              </>
            ) : null}
          </div>
          {((user.type === "employer" && data.company.id == user.id) ||
            user.type === "admin") &&
            applicant && (
              <Applicants id={id} onClose={() => setApplicant(false)} />
            )}
          {((user.type === "employer" && data.company.id == user.id) ||
            user.type === "admin") &&
            feedback && (
              <Feedbacks id={id} onClose={() => setFeedback(false)} />
            )}
        </div>
      ) : (
        <div className="h-full flex justify-center items-center flex-1 p-5 bg-white">
          {isPending ? (
            <div className="loader-lg"></div>
          ) : (
            <Empty entity="jobs" message={"Job not found"} />
          )}
        </div>
      )}
      {deleteModal && (
        <AlertDialog
          onClose={() => setDeleteModal(false)}
          title="Are you sure, you would like to delete this job post?"
          description="This action cannot be undone. This will permanently delete your job post."
          onAction={() => onAction({ value: "delete-confirm" })}
          isLoading={deleteJobMutation.isPending}
        />
      )}
      {apply && (
        <JobApplyModal
          id={id}
          company={data.company}
          onClose={() => setApply(false)}
        />
      )}
      {jobFeedback && (
        <FeedbackModal id={id} onClose={() => setJobFeedback(false)} />
      )}
      {report && (
        <ReportModal entity="jobs" id={id} onClose={() => setReport(false)} />
      )}
    </>
  );
};

export default JobDetails;
