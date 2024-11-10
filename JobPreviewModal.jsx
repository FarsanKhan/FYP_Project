import React from "react";
import BaseModal from "../ui/BaseModal";
import { TypographyH3, TypographyMuted, TypographyP } from "../ui/typography";
import { Button } from "../ui/button";
import { AiFillReconciliation } from "react-icons/ai";
import { GoLinkExternal } from "react-icons/go";
import { JobTypesMap, WorkplaceTypesMap } from "../../lib/utils";

const JobPreviewModal = ({ user, onClose, values }) => {
  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[744px]"
      title="Preview job post"
    >
      <div className="max-h-[700px] overflow-auto">
        <TypographyMuted>
          This is a preview of what your job post will look like to job seekers,
          which includes details about your job such as location.
        </TypographyMuted>
        <div className="mt-4 flex flex-col gap-7 rounded-md border border-neutral-200 p-5">
          <div>
            <img
              src={
                user.image
                  ? import.meta.env.VITE_API_BASE_URL + user.image
                  : "/ghost-company.jpg"
              }
              alt={user.name}
              width={48}
              height={48}
            />
            <TypographyH3 className="mt-3 leading-none">
              {values.title}
            </TypographyH3>
            <TypographyMuted className="mt-1">
              {values.name} · {values.location} · (
              {WorkplaceTypesMap[values.workplaceType]})
            </TypographyMuted>
          </div>
          <div className="flex items-center gap-2">
            <AiFillReconciliation size="1.25em" color="rgb(0 0 0/.6)" />
            <TypographyP className="text-sm">
              {JobTypesMap[values.type]}
            </TypographyP>
          </div>
          <Button
            disabled
            size="sm"
            className="h-9 w-28 bg-blue-500 rounded-full"
          >
            Apply
            <GoLinkExternal className="ml-2" size="1.25em" />
          </Button>
          <div dangerouslySetInnerHTML={{ __html: values.description }} />
        </div>
      </div>
    </BaseModal>
  );
};

export default JobPreviewModal;
