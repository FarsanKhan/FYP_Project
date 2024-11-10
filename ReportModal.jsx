import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { Button, LoaderButton } from "../ui/button";
import { GoArrowRight } from "react-icons/go";
import { cn, iconProps, reports } from "../../lib/utils";
import { useMutation } from "@tanstack/react-query";
import { reportEntity } from "../../api";

const ReportModal = ({ entity, id, onClose }) => {
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState("");
  const [step, setStep] = useState("initial");

  const reportEntityMutation = useMutation({
    mutationFn: reportEntity,
    onSuccess: () => {
      setStep("success");
      setTimeout(() => {
        onClose();
      }, 1000);
    },
  });

  const onReport = () => {
    reportEntityMutation.mutate({ id, reason: selected, entity });
  };

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[500px]"
      title={active !== null ? "Tell us a little more" : "Report"}
      footer={
        active !== null && step === "initial" ? (
          <div>
            <Button
              onClick={() => {
                setActive(null);
                setSelected("");
              }}
              size="sm"
              variant="ghost"
              className="h-9 w-28 text-blue-500"
            >
              Back
            </Button>
            <LoaderButton
              onClick={onReport}
              isLoading={reportEntityMutation.isPending}
              disabled={!selected}
              size="sm"
              className="h-9 min-w-28 bg-blue-500 rounded-full"
            >
              Submit
            </LoaderButton>
          </div>
        ) : null
      }
    >
      {step !== "initial" ? (
        <div>
          <TypographyP>
            <b> Thank you for reporting this </b>
          </TypographyP>
          <TypographyMuted>We appreciate you letting us know.</TypographyMuted>
        </div>
      ) : active !== null ? (
        <div className="flex flex-col gap-2">
          {reports[active].options.map((option) => (
            <div
              onClick={() => setSelected(option.value)}
              className={cn(
                "relative cursor-pointer pl-9 pr-2 py-2 rounded-md flex flex-col report-modal-option",
                selected == option.value ? "selected" : ""
              )}
            >
              <TypographyP>{option.label}</TypographyP>
              <TypographyMuted>{option.description}</TypographyMuted>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <TypographyP className="text-base pb-2 px-2 mb-1">
            <b>Why are you reporting this?</b>
          </TypographyP>
          <div className="flex flex-col gap-2">
            {reports
              .filter((rep) => {
                if (entity === "posts" && rep.value === "broken") return false;
                return true;
              })
              .map((rep, index) => (
                <div
                  onClick={() => setActive(index)}
                  className="cursor-pointer p-2 hover:bg-neutral-100 rounded-md flex items-center justify-between"
                >
                  <TypographyP>{rep.label}</TypographyP>
                  <GoArrowRight {...iconProps} />
                </div>
              ))}
          </div>
        </div>
      )}
    </BaseModal>
  );
};

export default ReportModal;
