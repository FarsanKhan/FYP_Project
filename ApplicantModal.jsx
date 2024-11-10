import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import { ApplicantStatus, cn, getRandomInitailsImage } from "../../lib/utils";
import { TypographyMuted, TypographyP } from "../ui/typography";
import moment from "moment";
import { Label } from "../ui/label";
import { Button, LoaderButton } from "../ui/button";
import SelectInput from "../ui/SelectInput";
import FilePreview from "../ui/FilePreview";
import { updateApplicantStatus } from "../../api/job";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { makeChat } from "../../api/chat";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";

const ApplicantModal = ({ id, applicant, onClose }) => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(applicant.applicantStatus);

  const updateApplicantStatusMutation = useMutation({
    mutationFn: updateApplicantStatus,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["job-applicants-" + id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const makeChatMutation = useMutation({
    mutationFn: makeChat,
    onSuccess: (chat) => {
      onClose();
      navigate("/app/messaging/" + chat.id);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <BaseModal
      onClose={onClose}
      footer={
        user.type !== "admin" ? (
          <LoaderButton
            isLoading={updateApplicantStatusMutation.isPending}
            disabled={applicant.applicantStatus === status}
            onClick={() =>
              updateApplicantStatusMutation.mutate({
                id,
                applicantID: applicant.id,
                applicantStatus: status,
              })
            }
            size="sm"
            className="h-9 min-w-28 bg-blue-500 rounded-full"
          >
            Submit
          </LoaderButton>
        ) : null
      }
      title="Applicant profile"
      description="Review application profile"
      contentClassname="!max-w-[525px]"
    >
      <div className="pb-4 border-b border-b-neutral-200 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <TypographyP className="text-base">
            <b>Contact info</b>
          </TypographyP>
          {user.type !== "admin" && (
            <Button
              onClick={() =>
                makeChatMutation.mutate({ receiverId: applicant.user.id })
              }
              variant="ghost"
              className="text-blue-500"
            >
              Message
            </Button>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <img
              className="overflow-hidden rounded-full"
              src={
                applicant.user.image
                  ? import.meta.env.VITE_API_BASE_URL + applicant.user.image
                  : getRandomInitailsImage(applicant.user.name)
              }
              alt={applicant.user.name}
              width={40}
              height={40}
            />
            <div>
              <TypographyP className="text-sm applicant-name">
                <b> {applicant.user.name}</b>
              </TypographyP>
              <TypographyMuted className="text-xs">
                {applicant.user.location}
              </TypographyMuted>
            </div>
          </div>
        </div>
        <div>
          <Label className="mb-1">Applied</Label>
          <TypographyP className="text-sm">
            {moment(applicant.createdAt).fromNow()}
          </TypographyP>
        </div>
        <div>
          <Label className="mb-1">Email address</Label>
          <TypographyP className="text-sm">{applicant.user.email}</TypographyP>
        </div>
        <div>
          <Label className="mb-1">Mobile phone number</Label>
          <TypographyP className="text-sm">{applicant.phone}</TypographyP>
        </div>
      </div>
      <div
        className={cn(
          "mt-5 pb-7",
          user.type !== "admin" ? "border-b border-b-neutral-200" : ""
        )}
      >
        <TypographyP className="text-base mb-2">
          <b>Resume</b>
        </TypographyP>
        <FilePreview
          file={{
            url: import.meta.env.VITE_API_BASE_URL + applicant.resume,
            name: applicant.resume.includes("\\")
              ? applicant.resume.split("\\").slice(-1)[0]
              : applicant.resume.split("/").slice(-1)[0],
          }}
        />
      </div>
      {user.type !== "admin" && (
        <div className="mt-5 pb-7">
          <TypographyP className="text-base mb-2">
            <b>Application Status</b>
          </TypographyP>
          <SelectInput
            options={ApplicantStatus}
            value={status}
            onChange={setStatus}
          />
        </div>
      )}
    </BaseModal>
  );
};

export default ApplicantModal;
