import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "../../api";
import MessageListItem from "../Messaging/MessageListItem";
import Empty from "../ui/Empty";
import { GoSearch } from "react-icons/go";
import { useStore } from "../../lib/store";
import debounce from "lodash.debounce";
import Search from "../ui/search";

const AllMessages = ({ onMessageClick }) => {
  const user = useStore((state) => state.user);
  const [filters, setFilters] = useState({});
  const { data, isPending } = useQuery({
    queryKey: ["chats", filters],
    queryFn: () => getChats(filters),
    refetchOnMount: true,
  });

  const onSearch = (query) => setFilters({ ...filters, query });

  return (
    <>
      <div className="p-2 border-b border-b-neutral-200">
        <Search onSearch={onSearch} placeholder="Search messages" />
      </div>
      <div className="flex-1 overflow-auto">
        {data && data.results && data.results.length > 0 ? (
          data.results.map((chat) => (
            <MessageListItem
              key={chat.id}
              {...chat}
              size="sm"
              self={user}
              message={chat.messages ? chat.messages[0] : undefined}
              onClick={() => onMessageClick(chat.id)}
            />
          ))
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
    </>
  );
};

export default AllMessages;
