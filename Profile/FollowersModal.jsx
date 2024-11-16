import React from "react";
import BaseModal from "../ui/BaseModal";
import { useStore } from "../../lib/store";
import { getUserFollowers } from "../../api";
import { useQuery } from "@tanstack/react-query";
import Empty from "../ui/Empty";
import { Link } from "react-router-dom";
import Follower from "./Follower";

const FollowersModal = ({ user, onClose }) => {
  const currentUser = useStore((state) => state.user);
  const { data: followers, isPending } = useQuery({
    queryFn: () => getUserFollowers(user.id),
    queryKey: ["user-followers-" + user.id],
    refetchOnMount: true,
  });

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[600px]"
      title={`${user.name} Followers`}
    >
      <div className="pt-5 gap-8 flex flex-col max-h-[250px] overflow-auto">
        {followers ? (
          followers.map((follower) =>
            currentUser.type === "admin" ? (
              <Follower key={follower.id} {...follower} />
            ) : (
              <Link
                to={`/app/profile/${follower.id}`}
                key={follower.id}
                onClick={onClose}
              >
                <Follower {...follower} />
              </Link>
            )
          )
        ) : (
          <div className="h-full flex justify-center items-center">
            {isPending ? (
              <div className="loader-lg"></div>
            ) : (
              <Empty entity="jobs" message={"No followers found"} />
            )}
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export default FollowersModal;
