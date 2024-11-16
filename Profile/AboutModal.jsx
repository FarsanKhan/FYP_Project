import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import WysiwigEditor from "../ui/WysiwigEditor";
import { LoaderButton } from "../ui/button";
import { useStore } from "../../lib/store";
import { TypographyMuted } from "../ui/typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api";
import toast from "react-hot-toast";

const AboutModal = ({ onClose }) => {
  const queryClient = useQueryClient();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.updateUser);
  const [content, setContent] = useState(user.about || "");
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      onClose();
      setUser({ ...user, about: content });
      toast.success("User updated successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["user-" + user.id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onChange = (e) => {
    setContent(e.target.value.replace(/--tw-[a-zA-Z-]+: [^;]+;/g, ""));
  };

  const onSave = () => {
    updateUserMutation.mutate({ about: content });
  };

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[600px]"
      title="Edit about"
      footer={
        <LoaderButton
          size="sm"
          isLoading={updateUserMutation.isPending}
          disabled={!content}
          onClick={onSave}
          className="h-9 min-w-28 bg-blue-500 rounded-full"
        >
          Save
        </LoaderButton>
      }
    >
      <div className="post-editor">
        <TypographyMuted className="mb-3">
          You can write about your years of experience, industry, or skills.
          People also talk about their achievements or previous job experiences.
        </TypographyMuted>
        <WysiwigEditor value={content} onChange={onChange} />
      </div>
    </BaseModal>
  );
};

export default AboutModal;
