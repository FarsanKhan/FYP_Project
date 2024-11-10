import React, { useRef, useState } from "react";
import { WorkplaceTypesMap, iconProps } from "../../lib/utils";
import { TypographyH4, TypographyMuted, TypographyP } from "../ui/typography";
import { useStore } from "../../lib/store";
import { Button, LoaderButton } from "../ui/button";
import { GoPlus, GoX } from "react-icons/go";
import JobPreviewModal from "./JobPreviewModal";
import WysiwigEditor from "../ui/WysiwigEditor";
import JobPreviewCard from "./JobPreviewCard";

const JobPostDescription = ({ onSubmit, onBack, values, isLoading }) => {
  const user = useStore((state) => state.user);
  const skillInputRef = useRef(null);
  const [description, setDescription] = useState(values.description || "");
  const [skills, setSkills] = useState(values.skills || []);
  const [preview, setPreview] = useState(false);

  const onChange = (e) => {
    setDescription(e.target.value.replace(/--tw-[a-zA-Z-]+: [^;]+;/g, ""));
  };
  const handleSubmit = () =>
    onSubmit({
      description: description.replace(/--tw-[a-zA-Z-]+: [^;]+;/g, ""),
      skills,
    });

  return (
    <>
      <div className="w-full py-8 gap-8 flex max-w-[77%]">
        <div className="flex-1">
          <div className="gap-4 flex flex-col bg-white rounded-md lined-box-shadow">
            <div className="px-5 py-3  border-b border-b-neutral-200">
              <TypographyH4>Tell us about the role</TypographyH4>
            </div>
            <div className="py-3 px-5">
              <div>
                <TypographyH4 className="mb-2 required-label">
                  Description
                </TypographyH4>
                <WysiwigEditor value={description} onChange={onChange} />
              </div>
              <div className="mt-14">
                <TypographyH4 className="mb-2">Skills</TypographyH4>
                <TypographyMuted>
                  Add skill keywords to make your job more visible to the right
                  candidates.
                </TypographyMuted>
                <div className="mt-3 gap-2 flex items-center">
                  {skills.map((skill, index) => (
                    <Button
                      size="sm"
                      onClick={() => {
                        const tmp = [...skills];
                        tmp.splice(index, 1);
                        setSkills(tmp);
                      }}
                      className="h-9 bg-green-700 rounded-full"
                    >
                      {skill}
                      <span className="ml-2">
                        <GoX size="1.25em" color="white" />
                      </span>
                    </Button>
                  ))}
                  <Button variant="outline" className="h-9 rounded-full">
                    <input
                      ref={skillInputRef}
                      className="bg-inherit outline-none h-8 w-16 placeholder-gray-700"
                      placeholder="Add skill"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.target.value) {
                          setSkills([...skills, e.target.value]);
                          e.target.value = "";
                        }
                      }}
                    />
                    <span className="ml-2 mb-0.5">
                      <GoPlus
                        {...iconProps}
                        size="1.25em"
                        onClick={() => {
                          if (
                            skillInputRef.current &&
                            skillInputRef.current.value
                          ) {
                            setSkills([...skills, skillInputRef.current.value]);
                            skillInputRef.current.value = "";
                          }
                        }}
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center px-5 py-3  border-t border-t-neutral-200">
              <Button
                variant="ghost"
                className="h-9 w-20 text-base text-blue-500"
                onClick={() => setPreview(true)}
              >
                Preview
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  onClick={onBack}
                  size="sm"
                  variant="ghost"
                  className="h-9 min-w-24 border border-black rounded-full"
                >
                  Back
                </Button>
                <LoaderButton
                  disabled={!description}
                  size="sm"
                  onClick={handleSubmit}
                  className="h-9 min-w-24 bg-blue-500 rounded-full"
                  isLoading={isLoading}
                >
                  Continue
                </LoaderButton>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "0 0 270px" }}>
          <JobPreviewCard user={user} {...values} />
        </div>
      </div>
      {preview && (
        <JobPreviewModal
          user={user}
          values={{ ...values, skills, description, name: user.name }}
          onClose={() => setPreview(false)}
        />
      )}
    </>
  );
};

export default JobPostDescription;
