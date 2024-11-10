import React, { useState } from "react";
import { TypographyH4, TypographyMuted, TypographyP } from "../ui/typography";
import { GoX } from "react-icons/go";
import { cn, getRandomInitailsImage, iconProps } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getJobApplicants } from "../../api/job";
import { Label } from "../ui/label";
import moment from "moment";
import ApplicantModal from "./ApplicantModal";
import Empty from "../ui/Empty";

const Applicants = ({ open, id, onClose }) => {
  const [showApplicant, setShowApplicant] = useState(null);
  const { data: applicants = [], isPending } = useQuery({
    queryKey: ["job-applicants-" + id],
    queryFn: () => getJobApplicants(id),
    refetchOnMount: true,
    enabled: open,
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
            <TypographyH4>Applicants</TypographyH4>
            <TypographyMuted>
              Showing all the applicants who have applied to this job
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
          {applicants && applicants.length > 0 ? (
            applicants.map((applicant, index) => (
              <div
                onClick={() => setShowApplicant(applicant)}
                className={cn(
                  "applicant-item cursor-pointer py-5 flex flex-col gap-2",
                  index !== applicants.length - 1
                    ? "border-b border-b-neutral-200"
                    : ""
                )}
                key={applicant.id}
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      className="overflow-hidden rounded-full"
                      src={
                        applicant.user.image
                          ? import.meta.env.VITE_API_BASE_URL +
                            applicant.user.image
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
                  <TypographyMuted className="text-xs">
                    Applied {moment(applicant.createdAt).fromNow()}
                  </TypographyMuted>
                </div>
                <div>
                  <Label className="mb-1">Email address</Label>
                  <TypographyP className="text-sm">
                    {applicant.user.email}
                  </TypographyP>
                </div>
                <div>
                  <Label className="mb-1">Mobile phone number</Label>
                  <TypographyP className="text-sm">
                    {applicant.phone}
                  </TypographyP>
                </div>
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
                  entity="applicants"
                  message="No one has applied for the job yet."
                />
              )}
            </div>
          )}
        </div>
      </div>
      {showApplicant && (
        <ApplicantModal
          id={id}
          applicant={showApplicant}
          onClose={() => setShowApplicant(null)}
        />
      )}
    </>
  );
};

export default Applicants;
