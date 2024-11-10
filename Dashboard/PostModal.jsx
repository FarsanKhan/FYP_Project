import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import WysiwigEditor from "../ui/WysiwigEditor";
import { LoaderButton } from "../ui/button";
import { useStore } from "../../lib/store";
import { TypographyH4 } from "../ui/typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost } from "../../api/post";
import toast from "react-hot-toast";

const PostModal = ({ id, content: savedContent = "", onClose, userId }) => {
  const user = useStore((state) => state.user);
  const [content, setContent] = useState(savedContent);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      onClose();
      toast.success("Post created successfully", { position: "bottom-right" });
      queryClient.invalidateQueries({ queryKey: ["posts" + userId] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      onClose();
      toast.success("Post updated successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["posts" + userId] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onChange = (e) => {
    setContent(e.target.value.replace(/--tw-[a-zA-Z-]+: [^;]+;/g, ""));
  };

  const onPost = () => {
    if (id) {
      updatePostMutation.mutate({ content, id });
    } else {
      createPostMutation.mutate({ content });
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[600px]"
      title={
        <div className="flex items-center gap-4">
          <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={
                user.image
                  ? import.meta.env.VITE_API_BASE_URL + user.image
                  : "/ghost-company.jpg"
              }
              alt={user.name}
            />
          </div>
          <div>
            <TypographyH4>{user.name}</TypographyH4>
          </div>
        </div>
      }
      footer={
        <LoaderButton
          size="sm"
          disabled={!content}
          isLoading={
            createPostMutation.isPending || updatePostMutation.isPending
          }
          onClick={onPost}
          className="h-9 min-w-28 bg-blue-500 rounded-full"
        >
          Post
        </LoaderButton>
      }
    >
      <div className="post-editor">
        <WysiwigEditor value={content} onChange={onChange} />
      </div>
    </BaseModal>
  );
};

export default PostModal;
