import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getPosts } from "../../api";
import toast from "react-hot-toast";
import ReportModal from "../Jobs/ReportModal";
import AlertDialog from "../ui/AlertDialog";
import PostModal from "./PostModal";
import PostListItem from "./PostListItem";
import Empty from "../ui/Empty";
import { Button } from "../ui/button";
import { useStore } from "../../lib/store";

const PostList = forwardRef(
  ({ isOwner = false, isProfileView = false, userId = "" }, ref) => {
    const user = useStore((state) => state.user);
    const queryClient = useQueryClient();
    const [post, setPost] = useState(null);
    const [alert, setAlert] = useState(null);
    const [report, setReport] = useState(null);

    const { data, isPending } = useQuery({
      queryKey: ["posts" + userId],
      queryFn: () => getPosts({ userId }),
      refetchOnMount: true,
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          setPost,
        };
      },
      []
    );

    const deletePostMutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        setAlert(null);
        toast.success("Post deleted successfully", {
          position: "bottom-right",
        });
        queryClient.invalidateQueries({ queryKey: ["posts" + userId] });
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });

    const onAction = (action, result) => {
      if (action.value === "edit") {
        setPost(result);
      } else if (action.value === "delete") {
        setAlert(result);
      } else if (action.value === "delete-confirm") {
        deletePostMutation.mutate(alert.id);
      } else if (action.value === "report") {
        setReport(result);
      }
    };
    return (
      <>
        {data && data.results.length > 0 ? (
          data.results.map((result) => (
            <PostListItem
              key={result.id}
              onAction={(action) => onAction(action, result)}
              isOwner={user.type === "employer" && user.id === result.user.id}
              isAdmin={user.type === "admin"}
              {...result}
            />
          ))
        ) : (
          <div className="min-h-[228px] flex items-center justify-center gap-4 p-5 rounded-md lined-box-shadow bg-white w-full">
            {isPending ? (
              <div className="loader-lg"></div>
            ) : (
              <Empty
                entity="posts"
                message={
                  (user.type === "employer" && !isProfileView) ||
                  (isProfileView && isOwner)
                    ? "Looks empty. Can you fill it by writing a post?"
                    : user.type === "admin" || isProfileView
                    ? "No posts found."
                    : "This wall looks empty. Follow companies to stay updated with the latest trends."
                }
                action={
                  (user.type === "employer" && !isProfileView) ||
                  (isProfileView && isOwner) ? (
                    <Button
                      className="text-blue-500 border-blue-500 rounded-full text-md"
                      variant="outline"
                      onClick={() => setPost({})}
                    >
                      Write your first post
                    </Button>
                  ) : null
                }
              />
            )}
          </div>
        )}
        {report && (
          <ReportModal
            entity="posts"
            id={report.id}
            onClose={() => setReport(null)}
          />
        )}
        {alert && (
          <AlertDialog
            onClose={() => setAlert(null)}
            title="Are you sure, you would like to delete this post?"
            description="This action cannot be undone. This will permanently delete your post."
            onAction={() => onAction({ value: "delete-confirm" })}
            isLoading={deletePostMutation.isPending}
          />
        )}
        {post && (
          <PostModal {...post} userId={userId} onClose={() => setPost(null)} />
        )}
      </>
    );
  }
);

export default PostList;
