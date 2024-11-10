import React, { useRef } from "react";
import { useStore } from "../../lib/store";
import { Button } from "../ui/button";
import FollowingSuggestion from "./FollowingSuggestion";
import MessagesBar from "./MessagesBar";
import ProfileWidget from "./ProfileWidget";
import { getRandomInitailsImage } from "../../lib/utils";
import PostList from "./PostList";

const Dashboard = () => {
  const postListRef = useRef();
  const user = useStore((state) => state.user);

  return (
    <>
      <div className="flex-1 flex items-start gap-6 w-full mt-24 max-w-[85%]">
        <ProfileWidget />
        <div style={{ flex: user.type === "job_seeker" ? 0.5 : 1 }}>
          {user.type !== "job_seeker" && (
            <div className="flex items-center px-4 gap-4 py-4 mb-3 rounded-md lined-box-shadow bg-white w-full">
              <div className="w-[46px] h-[46px] rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={
                    user.image
                      ? import.meta.env.VITE_API_BASE_URL + user.image
                      : user.type === "job_seeker"
                      ? getRandomInitailsImage(user.name)
                      : "/ghost-company.jpg"
                  }
                  alt={user.name}
                />
              </div>
              <Button
                onClick={() => postListRef.current.setPost({})}
                variant="outline"
                className="rounded-full w-full"
              >
                Write a post
              </Button>
            </div>
          )}
          <PostList ref={postListRef} />
        </div>
        {user.type === "job_seeker" && <FollowingSuggestion />}
      </div>
      <MessagesBar />
    </>
  );
};

export default Dashboard;
