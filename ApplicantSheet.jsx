import React from "react";
import BaseSheet from "../ui/BaseSheet";
import { getJobApplicants } from "../../api/job";
import { useQuery } from "@tanstack/react-query";

const ApplicantSheet = ({ id, onClose }) => {
  const { data: applicants, isPending } = useQuery({
    queryKey: ["job-applicants-" + id],
    queryFn: () => getJobApplicants(id),
  });
  return (
    <BaseSheet
      title="Applicants"
      description="Showing all the applicants who have applied to this job"
      onClose={onClose}
      className="!max-w-[800px]"
    ></BaseSheet>
  );
};

export default ApplicantSheet;
