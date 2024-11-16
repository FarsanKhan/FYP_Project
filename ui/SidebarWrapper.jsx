import React from "react";
import { TypographyP } from "../ui/typography";
import { cn, iconProps } from "../../lib/utils";
import { FaThLarge, FaUsers } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    label: "Dashboard",
    value: "/app/",
    icon: <FaThLarge {...iconProps} size="1.125em" />,
  },
  {
    label: "Users",
    value: "/app/users",
    icon: <FaUsers {...iconProps} size="1.425em" />,
  },
  {
    label: "Reports",
    value: "/app/reports",
    icon: <FaFlag {...iconProps} size="1em" />,
  },
];

const SidebarWrapper = ({ children, containerClassName, containerStyle }) => {
  const location = useLocation();
  return (
    <div className="w-full h-full flex bg-white pt-16">
      <div className="flex-[0.22] px-2 py-4 border-r border-r-neutral-200 shadow-md">
        <div className="list-items flex flex-col gap-3">
          <div className="flex px-3 gap-3 mb-2 items-center">
            <div className="mt-1 w-[40px] h-[40px] rounded-full overflow-hidden">
              <img
                src="/ghost-company.jpg"
                className="w-full h-full object-cover"
                alt="admin"
              />
            </div>
            <TypographyP className="font-semibold text-lg">Admin</TypographyP>
          </div>
          {items.map((item) => (
            <Link to={item.value}>
              <div
                className={cn(
                  "p-3 gap-2 rounded-md cursor-pointer hover:bg-neutral-100 flex items-center",
                  location.pathname === item.value ? "bg-neutral-100" : ""
                )}
              >
                {item.icon}
                <TypographyP className="font-semibold">
                  {item.label}
                </TypographyP>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        style={containerStyle}
        className={cn("flex-1 p-8", containerClassName)}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarWrapper;
