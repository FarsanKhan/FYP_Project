import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import { useStore } from "../../lib/store";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../api";
import toast from "react-hot-toast";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { Button } from "../ui/button";
import { GoCheckCircleFill, GoPlus } from "react-icons/go";
import { iconProps } from "../../lib/utils";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const JobSkillsModal = ({ onClose, skills, uniqueSkills }) => {
  const [c, setC] = useState("");
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.updateUser);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      let payload = [...(user.skills || []), c];
      setUser({ ...user, skills: payload });
      setC("");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onAdd = (skill) => {
    let payload = [...(user.skills || []), skill];
    setC(skill);
    updateUserMutation.mutate({
      skills: payload,
    });
  };

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[600px]"
      title="Qualification details"
    >
      <div>
        <TypographyP className="font-semibold">
          Skills added by the job poster
        </TypographyP>
        <TypographyP className="text-sm">
          {skills.length - uniqueSkills.length} skills found on your profile
          that match the skills associated with the job.
        </TypographyP>
        <div className="my-4">
          {skills.map((skill) => (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <GoCheckCircleFill
                  size="1.5em"
                  className={
                    uniqueSkills.includes(skill)
                      ? "text-gray-400"
                      : "text-green-600"
                  }
                />
                <TypographyP>{skill}</TypographyP>
              </div>
              {uniqueSkills.includes(skill) && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-base"
                  onClick={() => onAdd(skill)}
                  style={{ color: "rgb(0 0 0/.6)" }}
                >
                  <GoPlus {...iconProps} size="1.25em" className="mr-2" />
                  Add
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <BsFillInfoSquareFill {...iconProps} size="0.75em" />
          <TypographyMuted className="text-sm">
            You can manage all your skills on your profile.{" "}
            <Link to={`/app/profile/${user.id}`}>
              <span className="font-semibold text-blue-500 hover:underline cursor-pointer">
                Edit skills
              </span>
            </Link>
          </TypographyMuted>
        </div>
      </div>
    </BaseModal>
  );
};

export default JobSkillsModal;
