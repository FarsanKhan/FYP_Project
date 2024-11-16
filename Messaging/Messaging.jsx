import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Empty from "../ui/Empty";
import MessageListItem from "./MessageListItem";
import MessageDetails from "./MessageDetails";
import { getChats, readMessages } from "../../api";
import { useStore } from "../../lib/store";
import toast from "react-hot-toast";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import queryString from "query-string";

const Messaging = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const queryClient = useQueryClient();
  const filters = {
    ...queryString.parse(location.search),
  };

  const { data, isPending } = useQuery({
    queryKey: ["chats", filters],
    queryFn: () => getChats(filters),
    refetchInterval: 5000,
    refetchOnMount: true,
  });

  const readMessagesMutation = useMutation({
    mutationFn: readMessages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const queryURL = (url) => queryString.stringifyUrl({ url, query: filters });

  const onActive = (chatId) => {
    readMessagesMutation.mutate(chatId);
    navigate(queryURL(`/app/messaging/${chatId}`));
  };

  useEffect(() => {
    if (!id && data && data.results.length > 0)
      navigate(queryURL(`/app/messaging/${data.results[0].id}`));
  }, [data]);

  return (
    <div
      className="overflow-hidden flex items-start w-full bg-white mt-14 max-w-[100%]"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <div className="overflow-hidden pt-1 flex h-full flex-1">
        <div
          style={{
            flex: data && data.results && data.results.length > 0 ? 0.3 : 1,
          }}
          className="relative overflow-auto h-full border border-r-neutral-200"
        >
          {data && data.results && data.results.length > 0 ? (
            <>
              {data.results.map((chat) => (
                <Link
                  to={queryURL(`/app/messaging/${chat.id}`)}
                  onClick={() => readMessagesMutation.mutate(chat.id)}
                >
                  <MessageListItem
                    key={chat.id}
                    {...chat}
                    self={user}
                    message={chat.messages ? chat.messages[0] : undefined}
                    isActive={id == chat.id}
                  />
                </Link>
              ))}
            </>
          ) : (
            <div className="h-full flex justify-center items-center">
              {isPending ? (
                <div className="loader-lg"></div>
              ) : (
                <Empty entity="messages" message={"Enjoy your empty inbox"} />
              )}
            </div>
          )}
        </div>
        {id && data && data.results && data.results.length > 0 ? (
          <Routes>
            <Route
              path="/"
              element={
                <MessageDetails
                  id={id}
                  onDelete={() => {
                    const newRecord = data.results.find((r) => r.id != id);
                    if (newRecord) {
                      onActive(newRecord.id);
                    } else {
                      navigate(queryURL(`/app/messaging`));
                    }
                  }}
                />
              }
            />
          </Routes>
        ) : !isPending && data && data.results && data.results.length > 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty
              entity="messages"
              message="Select a message to view its details."
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Messaging;
