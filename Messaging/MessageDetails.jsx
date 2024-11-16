import React, { useEffect, useRef, useState } from "react";
import { TypographyP } from "../ui/typography";
import Dropdown from "../ui/Dropdown";
import { Ellipsis, X } from "lucide-react";
import { Button } from "../ui/button";
import WysiwigEditor from "../ui/WysiwigEditor";
import ConversationListItem from "./ConversationListItem";
import AlertDialog from "../ui/AlertDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteChat, getChat, sendMessage } from "../../api";
import toast from "react-hot-toast";
import { cn, iconProps } from "../../lib/utils";
import Empty from "../ui/Empty";
import { FaLocationArrow, FaVideo } from "react-icons/fa";
import { ws } from "../../lib/ws";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";

const ownerOptions = [
  {
    label: "Delete conversation",
    value: "delete",
  },
];

const MessageDetails = ({ id, onDelete, size, onClose }) => {
  const ref = useRef();
  const self = useStore((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["chat-" + id],
    queryFn: () => getChat(id),
    refetchInterval: 5000,
    refetchOnMount: true,
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-" + id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const deleteChatMutation = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      onDelete();
      setDeleteModal(false);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const enterMeeting = ({ meetingId }) => {
    navigate(`/app/meeting/${meetingId}`);
  };

  useEffect(() => {
    ws.on("meeting-created", enterMeeting);
    return () => {
      ws.off("meeting-created");
    };
  }, []);

  const createMeeting = () => {
    ws.emit("create-meeting", {
      peerId: data.user.id,
      creator: {
        id: self.id,
        name: self.name,
        image: self.image,
        type: self.type,
      },
    });
  };

  const onAction = (action) => {
    if (action.value === "delete") {
      setDeleteModal(true);
    } else if (action.value === "delete-confirm") {
      deleteChatMutation.mutate(id);
    }
  };

  const onChange = (e) => {
    setMessage(e.target.value.replace(/--tw-[a-zA-Z-]+: [^;]+;/g, ""));
  };

  useEffect(() => {
    if (data && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [data, ref.current]);

  return (
    <>
      <div
        className={cn(
          "flex flex-col flex-1 bg-white",
          size === "sm" ? "overflow-auto" : ""
        )}
      >
        {data && data.id ? (
          <>
            <div
              className={cn(
                "py-1 justify-between items-center flex border-b border-b-neutral-200",
                size === "sm" ? "px-2" : "px-5"
              )}
            >
              <TypographyP className="text-sm font-semibold">
                {data.user.name}
              </TypographyP>
              <div className="flex items-center">
                {self.type === "employer" && (
                  <Button onClick={createMeeting} variant="ghost" size="icon">
                    <FaVideo {...iconProps} size="1.3em" />
                  </Button>
                )}
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="icon">
                      <Ellipsis {...iconProps} size="1.5em" />
                    </Button>
                  }
                  options={ownerOptions}
                  onAction={onAction}
                />
                {onClose && (
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X size="1.5em" />
                  </Button>
                )}
              </div>
            </div>
            <div ref={ref} className="px-2 overflow-auto flex-1">
              {data &&
                data.messages &&
                data.messages.map((m) => (
                  <ConversationListItem key={m.id} size={size} {...m} />
                ))}
            </div>
            <div className="relative">
              <div className={cn("message-editor", size)}>
                <WysiwigEditor value={message} onChange={onChange} />
              </div>
              <div className={cn("flex justify-end")}>
                <Button
                  disabled={!message}
                  onClick={() => {
                    setMessage("");
                    ref.current.scrollTop = ref.current.scrollHeight + 64;
                    sendMessageMutation.mutate({ id, message });
                  }}
                  size="sm"
                  isLoading={sendMessageMutation.isPending}
                  className={cn(
                    "bg-blue-500 rounded-full",
                    "w-8 h-8 p-1 absolute top-1 right-2"
                  )}
                >
                  <FaLocationArrow
                    {...iconProps}
                    size="1.125em"
                    color="white"
                  />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex justify-center items-center flex-1 p-5 bg-white">
            {isPending ? (
              <div className="loader-lg"></div>
            ) : (
              <Empty entity="messages" message={"Conversation not found"} />
            )}
          </div>
        )}
      </div>
      {deleteModal && (
        <AlertDialog
          onClose={() => setDeleteModal(false)}
          title="Are you sure, you would like to delete this conversation?"
          description="This action cannot be undone. This will permanently delete your conversation."
          onAction={() => onAction({ value: "delete-confirm" })}
          isLoading={deleteChatMutation.isPending}
        />
      )}
    </>
  );
};

export default MessageDetails;
