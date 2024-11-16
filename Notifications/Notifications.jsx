import React, { useEffect } from "react";
import Empty from "../ui/Empty";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  getNotifications,
  readNotifications,
} from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";
import Notification from "./Notification";

const Notifications = ({ onClose }) => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchOnMount: true,
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const readNotificationsMutation = useMutation({
    mutationFn: readNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications-count"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  useEffect(() => {
    if (data && data.results) {
      const notificationIds = data.results
        .filter((r) => !r.read)
        .map((r) => r.id);
      if (notificationIds.length > 0) {
        readNotificationsMutation.mutate({ notificationIds });
      }
    }
  }, [data]);

  const onAction = (action, result) => {
    if (action.value === "delete") {
      deleteNotificationMutation.mutate(result.id);
    }
  };

  const onNavigate = (notification) => {
    if (notification.job) {
      onClose();
      navigate("/app/jobs/" + notification.job.id);
    } else if (notification.post) {
      onClose();
      navigate("/app");
    }
  };

  return (
    <div className="bg-white h-[260px] flex flex-col overflow-auto">
      {data && data.results && data.results.length > 0 ? (
        data.results.map((notification) => (
          <Notification
            user={user}
            key={notification.id}
            notification={notification}
            onAction={(action) => onAction(action, notification)}
            onClick={() => onNavigate(notification)}
          />
        ))
      ) : (
        <div className="h-full flex justify-center items-center">
          {isPending ? (
            <div className="loader-lg"></div>
          ) : (
            <Empty entity="notifications" message={"No notifications found"} />
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
