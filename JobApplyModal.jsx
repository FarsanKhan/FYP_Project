import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { Button, LoaderButton } from "../ui/button";
import Contact from "./Contact";
import Resume from "./Resume";
import { Checkbox } from "../ui/checkbox";
import { Check } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyJob } from "../../api/job";
import { getCompanyFollowerStats } from "../../api";

const JobApplyModal = ({ id, company, onClose }) => {
  const [step, setStep] = useState("contact");
  const [isReview, setReview] = useState(false);
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [follow, setFollow] = useState(false);
  const [fileErr, setFileErr] = useState(false);
  const queryClient = useQueryClient();

  const { data: companyFollowerStats } = useQuery({
    queryKey: ["company-followers-" + company.id],
    queryFn: () => getCompanyFollowerStats(company.id),
  });

  const applyJobMutation = useMutation({
    mutationFn: applyJob,
    onSuccess: () => {
      setStep("sent");
      setTimeout(() => {
        onClose();
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["job-" + id],
      });
      queryClient.invalidateQueries({
        queryKey: ["company-followers-" + company.id],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onStepChange = () => {
    if (step === "contact") {
      const form = document.getElementById("contact-form");
      form.click();
      if (form.parentElement.checkValidity()) {
        if (isReview) {
          setStep("review");
        } else {
          setStep("resume");
        }
      }
    } else if (step === "resume") {
      if (!file) {
        setFileErr(true);
      } else {
        setStep("review");
      }
    } else if (step === "review") {
      const formData = new FormData();
      formData.append("phone", "+92" + phone);
      formData.append("file", file);
      if (follow) {
        formData.append("follow", follow);
      }
      applyJobMutation.mutate({ formData, id });
    }
  };

  const onBack = () => {
    if (step === "resume") {
      setStep("contact");
    } else if (step === "review") {
      setStep("resume");
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[600px]"
      title={"Apply to " + company.name}
      footer={
        step !== "sent" ? (
          <div className="flex items-center">
            {step !== "contact" && !isReview && (
              <Button
                onClick={onBack}
                size="sm"
                variant="ghost"
                className="h-9 w-28 text-blue-500"
              >
                Back
              </Button>
            )}
            <LoaderButton
              onClick={onStepChange}
              size="sm"
              isLoading={applyJobMutation.isPending}
              className="h-9 min-w-28 bg-blue-500 rounded-full"
            >
              {step === "review"
                ? "Submit application"
                : isReview
                ? "Review"
                : "Next"}
            </LoaderButton>
          </div>
        ) : null
      }
    >
      {step === "contact" ? (
        <Contact phone={phone} setPhone={setPhone} />
      ) : step === "resume" ? (
        <Resume
          file={file}
          setFile={setFile}
          fileErr={fileErr}
          setFileErr={setFileErr}
        />
      ) : step === "review" ? (
        <div className="flex flex-col gap-3">
          <div className="pb-4 border-b border-b-neutral-200">
            <TypographyP className="text-base">
              Review your application
            </TypographyP>
          </div>
          <div className="pb-7 border-b border-b-neutral-200">
            <Contact
              preview
              phone={phone}
              setPhone={setPhone}
              onEdit={() => {
                setReview(true);
                setStep("contact");
              }}
            />
          </div>
          <div className="pb-7 border-b border-b-neutral-200">
            <Resume
              preview
              file={file}
              setFile={setFile}
              onEdit={() => {
                setReview(true);
                setStep("resume");
              }}
            />
          </div>
          {(!companyFollowerStats ||
            (companyFollowerStats && !companyFollowerStats.isFollowing)) && (
            <div className="flex items-center gap-2 pt-3 pb-6 border-b border-b-neutral-200">
              <Checkbox
                checked={follow}
                onClick={() => setFollow(!follow)}
                className="border border-blue-500 data-[state=checked]:bg-blue-500"
              />
              <TypographyMuted>
                Follow <b>{company.name}</b> to stay up to date with their page.
              </TypographyMuted>
            </div>
          )}
        </div>
      ) : step === "sent" ? (
        <div className="flex flex-col pt-3 gap-3 justify-center items-center">
          <div className="flex justify-center items-center w-20 h-20 rounded-full bg-green-600">
            <Check color="white" size="3.5em" />
          </div>
          <TypographyP>
            <b> Your application was sent to {company.name}!</b>
          </TypographyP>
        </div>
      ) : null}
    </BaseModal>
  );
};

export default JobApplyModal;
