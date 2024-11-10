import React, { useState } from "react";
import { TypographyH4, TypographyP } from "../ui/typography";
import { GoArrowRight, GoTasklist } from "react-icons/go";
import { iconProps } from "../../lib/utils";
import { BsExclamationDiamondFill } from "react-icons/bs";
import { useStore } from "../../lib/store";
import { Button } from "../ui/button";
import { FaRegLightbulb } from "react-icons/fa";
import JobSkillsModal from "./JobSkillsModal";

const SkillsCard = ({ skills }) => {
  const user = useStore((state) => state.user);
  const [jobSkills, setJobSkills] = useState(false);
  const uniqueSkills = skills.filter(
    (skill) => !(user.skills || []).includes(skill)
  );
  return (
    <>
      <div
        id="skills-section"
        className="mb-3 relative rounded-md lined-box-shadow flex flex-col"
      >
        <div className="p-5">
          <TypographyH4>Qualifications</TypographyH4>
          <div className="flex items-center gap-4 mt-3">
            <GoTasklist {...iconProps} size="2em" />
            <TypographyP>
              Stand out by adding skills associated with the job post
            </TypographyP>
          </div>
        </div>
        <div className="border-t border-t-neutral-200 p-5">
          <TypographyP className="font-semibold">
            Skills added by the job poster
          </TypographyP>
          {uniqueSkills.length > 0 && (
            <div>
              <div className="mt-2 flex items-start gap-2">
                <BsExclamationDiamondFill
                  {...iconProps}
                  size="0.875em"
                  className="mt-1"
                />
                <div>
                  <TypographyP className="text-sm font-semibold">
                    {uniqueSkills.length} skills missing on your profile
                  </TypographyP>
                  <TypographyP className="text-sm">
                    {uniqueSkills.join(", ")}
                  </TypographyP>
                </div>
              </div>
              <div className="bg-blue-50 p-3 mt-3 flex items-center">
                <FaRegLightbulb {...iconProps} size="0.875em" />
                <TypographyP className="text-sm ml-2">
                  Add skills you have to your profile to stand out to the
                  employer.{" "}
                  <span
                    className="cursor-pointer hover:underline font-semibold text-blue-500"
                    onClick={() => setJobSkills(true)}
                  >
                    Add skills
                  </span>
                </TypographyP>
              </div>
            </div>
          )}
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJobSkills(true)}
              className="border-neutral-600 rounded-full"
            >
              Show qualification details{" "}
              <GoArrowRight
                {...iconProps}
                size="1.25em"
                className="ml-1"
                color="black"
              />
            </Button>
          </div>
        </div>
      </div>
      {jobSkills && (
        <JobSkillsModal
          skills={skills}
          uniqueSkills={uniqueSkills}
          onClose={() => setJobSkills(false)}
        />
      )}
    </>
  );
};

export default SkillsCard;
