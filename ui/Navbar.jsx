import React, { useState } from "react";
import { GoHomeFill, GoBellFill, GoLocation } from "react-icons/go";
import { AiFillMessage, AiFillReconciliation } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa6";
import { Cities, cn, getRandomInitailsImage, iconProps } from "../../lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";
import { logout } from "../../api";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { TypographyMuted, TypographyP } from "./typography";
import { Button } from "./button";
import queryString from "query-string";
import Search from "../ui/Search";
import BellIcon from "../Notifications/BellIcon";
import AutocompleteInput from "./AutocompleteInput";

const items = [
  {
    label: "Home",
    value: "/app",
    icon: <GoHomeFill {...iconProps} />,
  },
  {
    label: "Jobs",
    value: "/app/jobs?type=all",
    icon: <AiFillReconciliation {...iconProps} />,
  },
  {
    label: "Messaging",
    value: "/app/messaging",
    icon: <AiFillMessage {...iconProps} />,
  },
  {
    label: "Notifications",
    value: "/app/notifications",
    icon: <GoBellFill {...iconProps} />,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");
  const user = useStore((state) => state.user);
  const [userOpen, setUserOpen] = useState(false);
  const removeUser = useStore((state) => state.removeUser);
  const filters = {
    ...queryString.parse(location.search),
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeUser();
      window.location.href = "/";
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  const onSearch = (_filters) => {
    console.log(_filters);
    let url = "/app";
    if (location.pathname.includes("messaging")) {
      url = "/app/messaging";
    } else if (location.pathname.includes("jobs")) {
      url = "/app/jobs";
    } else if (_filters.query) {
      url = `/app/search/results`;
    }
    navigate(
      queryString.stringifyUrl({ url, query: { ...filters, ..._filters } })
    );
  };

  return (
    <div className="z-10 min-h-[61px] fixed bg-white overflow-hidden border-bottom-1 top-0 w-full flex justify-center">
      <div className="items-center flex justify-between w-full max-w-[65%]">
        <div className="relative justify-end flex items-center gap-4 p-3 min-w-[450px]">
          <div className="absolute z-20 left-0">
            <Link to="/app">
              <img src="/logo.png" alt="logo" width={180} height={180} />
            </Link>
          </div>
          {user.type !== "admin" && (
            <div
              className={cn(
                "flex items-center gap-4",
                location.pathname.includes("/jobs") ? "ml-48" : ""
              )}
            >
              <Search
                defaultValue={filters.query}
                onSearch={(q) => onSearch({ query: q })}
                placeholder={
                  location.pathname.includes("messaging")
                    ? "Search messages"
                    : location.pathname.includes("jobs")
                    ? "Title, skill or company"
                    : "Search"
                }
              />
              {location.pathname.includes("/jobs") && (
                <>
                  {/* <Search
                    left={
                      <div
                        className="absolute top-[50%] left-[8px]"
                        style={{ transform: "translateY(-50%)" }}
                      >
                        <GoLocation size="1.125em" />
                      </div>
                    }
                    defaultValue={filters.location}
                    onSearch={(q) => onSearch({ location: q })}
                    placeholder="Location"
                  /> */}
                  <AutocompleteInput
                    freeSolo
                    placeholder="Location"
                    options={Cities}
                    onChange={(q) => {
                      onSearch({ location: q });
                    }}
                    renderInput={(params) => (
                      <Search
                        {...params}
                        left={
                          <div
                            className="absolute top-[50%] left-[8px]"
                            style={{ transform: "translateY(-50%)" }}
                          >
                            <GoLocation size="1.125em" />
                          </div>
                        }
                        showClose
                        fireOnChange
                        defaultValue={params.value || filters.location}
                        onSearch={(q, r) => {
                          if (r === "clear" || r === "enter") {
                            onSearch({ location: q });
                          }
                          params.onChange({ target: { value: q } });
                        }}
                        placeholder="Location"
                      />
                    )}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center h-full">
          {user.type !== "admin" && (
            <>
              {items.slice(0, 3).map((item) => {
                const isActive =
                  item.value === "/app"
                    ? item.value === location.pathname
                    : location.pathname.includes(
                        item.value.replace("?type=all", "")
                      );
                return (
                  <Link className="h-full" to={item.value} key={item.value}>
                    <div
                      className={cn(
                        "relative h-full justify-center icon-nav cursor-pointer flex flex-col items-center",
                        active !== "/app/notifications" && isActive
                          ? "active"
                          : ""
                      )}
                    >
                      {item.icon}
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  </Link>
                );
              })}
              <BellIcon
                active={active}
                item={items.slice(3)[0]}
                setActive={setActive}
              />
            </>
          )}

          <Popover open={userOpen} onOpenChange={setUserOpen}>
            <PopoverTrigger className="h-full">
              <div
                className={cn(
                  "relative h-full justify-center icon-nav cursor-pointer flex flex-col items-center"
                )}
              >
                <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                  <img
                    src={
                      user.image
                        ? import.meta.env.VITE_API_BASE_URL + user.image
                        : user.type === "job_seeker"
                        ? getRandomInitailsImage(user.name)
                        : "/ghost-company.jpg"
                    }
                    className="object-cover w-full h-full"
                    alt={user.name}
                  />
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-muted-foreground">Me</p>
                  <FaCaretDown {...iconProps} size="0.75em" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end" sideOffset={4}>
              <div className="border-b border-b-neutral-200 px-4 py-4">
                <div
                  className={cn(
                    "flex gap-3",
                    user.type === "admin" ? "items-center" : "items-start"
                  )}
                >
                  <div className="mt-1 w-[40px] h-[40px] rounded-full overflow-hidden">
                    <img
                      src={
                        user.image
                          ? import.meta.env.VITE_API_BASE_URL + user.image
                          : user.type === "job_seeker"
                          ? getRandomInitailsImage(user.name)
                          : "/ghost-company.jpg"
                      }
                      className="w-full h-full object-cover"
                      alt={user.name}
                    />
                  </div>
                  <div className="flex-1">
                    <TypographyP className="font-semibold">
                      {user.name}
                    </TypographyP>
                    <TypographyP className="text-sm">
                      {user.industry || user.headline}
                    </TypographyP>
                  </div>
                </div>
                {user.type !== "admin" && (
                  <Link
                    to={`/app/profile/${user.id}`}
                    onClick={() => setUserOpen(false)}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 h-7 w-full text-blue-500 border-blue-500 rounded-full"
                    >
                      View Profile
                    </Button>
                  </Link>
                )}
              </div>
              <TypographyMuted
                onClick={() => logoutMutation.mutate()}
                className="cursor-pointer px-4 py-3 text-sm"
              >
                Sign Out
              </TypographyMuted>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
