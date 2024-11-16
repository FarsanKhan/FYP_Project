import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import { Button, LoaderButton } from "../ui/button";
import { useStore } from "../../lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { GoTrash, GoX } from "react-icons/go";
import { TypographyP } from "../ui/typography";
import { cn, iconProps } from "../../lib/utils";

const SkillsModal = ({ isEdit, onClose }) => {
  const queryClient = useQueryClient();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.updateUser);
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState(isEdit ? user.skills || [] : []);
  const [formErr, setFormErr] = useState(false);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      onClose();
      let payload = [...(user.skills || []), ...skills];

      if (isEdit) {
        payload = [...skills];
      }
      setUser({ ...user, skills: payload });
      toast.success("User updated successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["user-" + user.id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onSave = () => {
    if (!skills.length) {
      setFormErr(true);
    } else {
      setFormErr(false);
      let payload = [...(user.skills || []), ...skills];

      if (isEdit) {
        payload = [...skills];
      }

      updateUserMutation.mutate({
        skills: payload,
      });
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[600px]"
      title={isEdit ? "Edit skills" : "Add skill"}
      footer={
        <LoaderButton
          size="sm"
          isLoading={updateUserMutation.isPending}
          onClick={onSave}
          className="h-9 min-w-28 bg-blue-500 rounded-full"
        >
          Save
        </LoaderButton>
      }
    >
      {!isEdit ? (
        <>
          <Input
            label="Skill"
            name="skill"
            error={formErr ? "Skill is a required field" : ""}
            value={skill}
            onKeyPress={(e) => {
              if (e.key === "Enter" && skill) {
                setSkill("");
                setSkills([...skills, skill]);
              }
            }}
            onChange={(e) => {
              setFormErr(false);
              setSkill(e.target.value);
            }}
            placeholder="Skill (ex: Project Management)"
          />
          <div className="mt-4 flex items-center gap-4">
            {skills.map((s, index) => (
              <Button
                size="sm"
                onClick={() => {
                  const tmp = [...skills];
                  tmp.splice(index, 1);
                  setSkills(tmp);
                }}
                className="h-9 bg-green-700 rounded-full"
              >
                {s}
                <span className="ml-2">
                  <GoX size="1.25em" color="white" />
                </span>
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-4 flex-col flex gap-4">
          {skills.map((s, index) => (
            <div
              className={cn(
                "flex items-center pb-2 justify-between",
                index === skills.length - 1
                  ? ""
                  : "border-b border-b-neutral-200"
              )}
            >
              <TypographyP className="font-semibold">{s}</TypographyP>
              {skills.length > 1 && (
                <GoTrash
                  onClick={() => {
                    const tmp = [...skills];
                    tmp.splice(index, 1);
                    setSkills(tmp);
                  }}
                  {...iconProps}
                  size="1.25em"
                  className="cursor-pointer"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </BaseModal>
  );
};

export default SkillsModal;
