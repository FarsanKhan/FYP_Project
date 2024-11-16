import React from "react";
import { GoAlert } from "react-icons/go";
import { TypographyP } from "./typography";
import { cn, iconProps } from "../../lib/utils";

const WarningBanner = ({ message, className }) => {
  return (
    <div
      className={cn("p-3 flex items-center", className)}
      style={{ background: "rgba(242, 179, 68, 0.10)" }}
    >
      <GoAlert {...iconProps} size="1.125em" />
      <TypographyP className="text-sm ml-2">{message}</TypographyP>
    </div>
  );
};

export default WarningBanner;
