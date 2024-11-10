import React from "react";
import { TypographyH3 } from "../ui/typography";
import SelectInput from "../ui/SelectInput";
import { Button } from "../ui/button";
import { Cities, JobTitles, JobTypes, WorkplaceTypes } from "../../lib/utils";

const JobPostInitial = ({ onSubmit, values }) => {
  return (
    <div className="gap-4 flex flex-col bg-white rounded-md w-[384px] px-6 pt-6 pb-7 lined-box-shadow">
      <TypographyH3>Post a job</TypographyH3>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <SelectInput
          required
          name="title"
          label="Job title"
          dynamicDefaultValue
          defaultValue={values.title}
          placeholder="Select the title you are hiring for"
          options={JobTitles}
        />
        <SelectInput
          required
          defaultValue={values.workplaceType || "onsite"}
          name="workplaceType"
          label="Workplace type"
          dynamicDefaultValue
          options={WorkplaceTypes}
        />
        <SelectInput
          required
          name="location"
          defaultValue={values.location}
          label="Employee location"
          placeholder="Select employee location"
          options={Cities}
          dynamicDefaultValue
        />
        <SelectInput
          required
          defaultValue={values.type || "full_time"}
          name="type"
          label="Job type"
          dynamicDefaultValue
          options={JobTypes}
        />
        <Button
          size="lg"
          className="mt-4 bg-blue-500 font-medium rounded-full text-base"
        >
          Get started
        </Button>
      </form>
    </div>
  );
};

export default JobPostInitial;
