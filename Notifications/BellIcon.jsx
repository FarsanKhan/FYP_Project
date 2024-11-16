import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Notifications from "./Notifications";
import { cn } from "../../lib/utils";
import { getNotificationCount } from "../../api";
import { useQuery } from "@tanstack/react-query";

function BellIcon({ active, item, setActive }) {
  const { data } = useQuery({
    queryKey: ["notifications-count"],
    queryFn: getNotificationCount,
    refetchOnMount: true,
    refetchInterval: 5000,
  });

  const [open, setOpen] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        if (!o) setActive("");
        setOpen(o);
      }}
    >
      <PopoverTrigger className="h-full">
        <div
          key={item.value}
          onClick={() => setActive(item.value)}
          className={cn(
            "relative h-full justify-center icon-nav cursor-pointer flex flex-col items-center",
            active === item.value ? "active" : ""
          )}
        >
          {data && data.notifications > 0 && (
            <div className="bg-red-600 w-[18px] h-[18px] top-[2px] right-[24px] absolute rounded-full flex items-center justify-center font-bold">
              <span className="text-xs !text-white">{data.notifications}</span>
            </div>
          )}
          {item.icon}
          <p className="text-xs text-muted-foreground">{item.label}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-96" align="end" sideOffset={4}>
        <Notifications
          onClose={() => {
            setActive("");
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default BellIcon;
