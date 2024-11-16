import React, { useState } from "react";
import BaseSheet from "../ui/BaseSheet";
import {
  capitalizeFirstLetter,
  cn,
  iconProps,
  ReportMap,
} from "../../lib/utils";
import { TypographyP } from "../ui/typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import {
  disableReportEntity,
  enableReportEntity,
  getReportDetails,
} from "../../api";
import { Descriptions } from "antd";
import moment from "moment";
import Follower from "../Profile/Follower";
import { AiFillReconciliation } from "react-icons/ai";
import Dropdown from "../ui/Dropdown";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import JobDetails from "../Jobs/JobDetails";
import toast from "react-hot-toast";
import AlertDialog from "../ui/AlertDialog";
import DeletedItem from "../ui/DeletedItem";
import PostListItem from "../Dashboard/PostListItem";

function ReportDetails({ onClose }) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState(false);
  const [job, setJob] = useState(null);
  const { data, isPending } = useQuery({
    queryKey: ["report-" + id],
    queryFn: () => getReportDetails(id),
  });

  const disableReportEntityMutation = useMutation({
    mutationFn: disableReportEntity,
    onSuccess: () => {
      setAlert(false);
      toast.success(
        `${capitalizeFirstLetter(
          data.entity.replace("s", "")
        )} disabled successfully`,
        {
          position: "bottom-right",
        }
      );
      queryClient.invalidateQueries({ queryKey: ["report-" + id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const enableReportEntityMutation = useMutation({
    mutationFn: enableReportEntity,
    onSuccess: () => {
      setAlert(false);
      toast.success(
        `${capitalizeFirstLetter(
          data.entity.replace("s", "")
        )} enabled successfully`,
        {
          position: "bottom-right",
        }
      );
      queryClient.invalidateQueries({ queryKey: ["report-" + id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleActions = (action) => {
    if (action.value === "disable") {
      setAlert(true);
    } else if (action.value === "disable-confirm") {
      disableReportEntityMutation.mutate({
        entityId: data.entityId,
        entity: data.entity,
      });
    } else if (action.value === "enable") {
      enableReportEntityMutation.mutate({
        entityId: data.entityId,
        entity: data.entity,
      });
    }
  };

  return (
    <BaseSheet
      title="Report Details"
      description="Showing all the details for this report"
      onClose={onClose}
      headerClassName={job ? "hidden" : ""}
      className={cn(
        "!max-w-[650px] overflow-auto flex flex-col",
        job ? "p-0" : ""
      )}
      hideClose={job}
    >
      <div className={cn("relative flex-1", job ? "" : "mt-5")}>
        {isPending ? (
          <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center">
            <div className="loader-lg" />
          </div>
        ) : data ? (
          <>
            {job ? (
              <JobDetails id={job.id} onBack={() => setJob(null)} />
            ) : (
              <div className="flex flex-col gap-8">
                <div className="mb-8">
                  <TypographyP className="mb-4 text-base">
                    <b>Report info</b>
                  </TypographyP>
                  <Descriptions
                    bordered
                    items={[
                      {
                        label: "ID",
                        children: data.id,
                        span: 3,
                      },
                      {
                        label: "Section",
                        children: (
                          <span className="capitalize">{data.entity}</span>
                        ),
                        span: 3,
                      },
                      {
                        label: "Reason",
                        children: ReportMap[data.reason].label,
                        span: 3,
                      },
                      {
                        label: "Creation Date",
                        children: moment(data.createdAt).format(
                          "MM/DD/YYYY hh:mm A"
                        ),
                        span: 3,
                      },
                      {
                        label: "Last Updated",
                        children: moment(data.updatedAt).format(
                          "MM/DD/YYYY hh:mm A"
                        ),
                        span: 3,
                      },
                    ]}
                  />
                </div>
                <div className="">
                  <TypographyP className="mb-4 text-base">
                    <b>Report by</b>
                  </TypographyP>
                  <Link to={`/app/users/${data.user.id}`}>
                    <Follower {...data.user} isClickable />
                  </Link>
                </div>
                <div>
                  <TypographyP className="mb-4 text-base">
                    <b>Reported {data.entity === "jobs" ? "job" : "post"}</b>
                  </TypographyP>
                  {data.entity === "jobs" ? (
                    data.job ? (
                      <div className="flex items-center justify-between">
                        <div
                          className="flex cursor-pointer items-center gap-2 profile-job-list-item"
                          onClick={() => setJob(data.job)}
                        >
                          <AiFillReconciliation
                            size="1.5em"
                            color="rgb(0 0 0/.6)"
                          />
                          <TypographyP className="profile-job-list-item-title font-semibold">
                            {data.job.title}
                          </TypographyP>
                        </div>
                        <Dropdown
                          trigger={
                            <Button variant="ghost" size="icon">
                              <Ellipsis {...iconProps} />
                            </Button>
                          }
                          options={
                            data.job.status === 1
                              ? [
                                  {
                                    label: "Disable",
                                    value: "disable",
                                  },
                                ]
                              : [
                                  {
                                    label: "Enable",
                                    value: "enable",
                                  },
                                ]
                          }
                          onAction={handleActions}
                        />
                      </div>
                    ) : (
                      <DeletedItem message="This job was deleted by the creator." />
                    )
                  ) : data.entity === "posts" ? (
                    data.post ? (
                      <PostListItem
                        {...data.post}
                        onAction={handleActions}
                        isAdmin
                        adminOptions={
                          data.post.status === 1
                            ? [{ label: "Disable this post", value: "disable" }]
                            : [{ label: "Enable this post", value: "enable" }]
                        }
                      />
                    ) : (
                      <DeletedItem message="This post was deleted by the creator." />
                    )
                  ) : null}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
      {alert && (
        <AlertDialog
          isLoading={disableReportEntityMutation.isPending}
          onClose={() => setAlert(false)}
          title={`Are you sure, you would like to disable this ${data.entity.replace(
            "s",
            ""
          )}?`}
          description={
            data.entity === "jobs"
              ? "Disabling this job would remove it from the job listing."
              : "Disabling this post would remove it from the user feed."
          }
          onAction={() => handleActions({ value: "disable-confirm" }, alert)}
        />
      )}
    </BaseSheet>
  );
}

export default ReportDetails;
