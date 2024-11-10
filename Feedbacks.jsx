import React from "react";
import { TypographyH4, TypographyMuted, TypographyP } from "../ui/typography";
import { GoX } from "react-icons/go";
import { cn, getRandomInitailsImage, iconProps } from "../../lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobFeedbacks, removeJobFeedback } from "../../api/job";
import moment from "moment";
import Empty from "../ui/Empty";
import toast from "react-hot-toast";

const Feedbacks = ({ open, id, onClose }) => {
  const queryClient = useQueryClient();
  const { data: feedbacks = [], isPending } = useQuery({
    queryKey: ["job-feedbacks-" + id],
    queryFn: () => getJobFeedbacks(id),
    refetchOnMount: true,
    enabled: open,
  });

  const removeJobFeedbackMutation = useMutation({
    mutationFn: removeJobFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-feedbacks-" + id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <>
      <div
        className={cn(
          "overflow-auto h-full flex-[0.675] p-5 border-l border-l-neutral-200 flex flex-col gap-2 bg-white"
        )}
      >
        <div className="flex justify-between">
          <div className="flex-1">
            <TypographyH4>Feedbacks</TypographyH4>
            <TypographyMuted>
              Showing all the feedbacks for this job
            </TypographyMuted>
          </div>
          <GoX
            {...iconProps}
            onClick={onClose}
            className="cursor-pointer"
            size="1.5em"
          />
        </div>
        <div>
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <div
                className={cn(
                  "py-5 flex flex-col gap-4",
                  index !== feedbacks.length - 1
                    ? "border-b border-b-neutral-200"
                    : ""
                )}
                key={feedback.id}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      className="overflow-hidden rounded-full"
                      src={getRandomInitailsImage(feedback.user.name)}
                      alt={feedback.user.name}
                      width={40}
                      height={40}
                    />
                    <div>
                      <TypographyP className="text-sm">
                        <b> {feedback.user.name}</b>
                      </TypographyP>
                      <TypographyMuted className="text-xs">
                        Submitted {moment(feedback.createdAt).fromNow()}
                      </TypographyMuted>
                    </div>
                  </div>
                  <GoX
                    className="cursor-pointer"
                    {...iconProps}
                    onClick={() =>
                      removeJobFeedbackMutation.mutate({
                        id,
                        feedbackId: feedback.id,
                      })
                    }
                    size="1.325rem"
                  />
                </div>
                <TypographyP className="text-sm">
                  {feedback.comment}
                </TypographyP>
              </div>
            ))
          ) : (
            <div
              style={{ height: "calc(100vh - 156px)" }}
              className="flex justify-center items-center flex-1 p-5 bg-white"
            >
              {isPending ? (
                <div className="loader-lg"></div>
              ) : (
                <Empty
                  entity="feedbacks"
                  message="No feedback has been submitted yet."
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feedbacks;
