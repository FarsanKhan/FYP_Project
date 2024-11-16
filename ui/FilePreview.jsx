import React from "react";
import { cn, downloadFromURL, iconProps } from "../../lib/utils";
import { TypographyMuted, TypographyP } from "./typography";
import moment from "moment";
import { GoDownload } from "react-icons/go";

function FilePreview({ file }) {
  return (
    <div className="mb-1 flex items-center overflow-hidden rounded-lg border border-neutral-700">
      <div
        className={cn(
          "px-3 py-2 self-stretch flex items-center justify-center",
          file.name.split(".").slice(-1)[0] === "pdf"
            ? "bg-red-600"
            : "bg-blue-600"
        )}
      >
        <TypographyP className="uppercase text-white text-base font-semibold">
          {file.name.split(".").slice(-1)[0]}
        </TypographyP>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div className="py-2 px-3">
          <TypographyP className="w-[350px] font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis">
            {file.name}
          </TypographyP>
          <TypographyMuted>
            Uploaded on{" "}
            {moment(file.createdAt || new Date()).format("MM/DD/YYYY")}
          </TypographyMuted>
        </div>
        {file.url && (
          <GoDownload
            {...iconProps}
            onClick={() => downloadFromURL(file.url, file.name)}
            className="cursor-pointer mr-3 mb-1"
            size="1.5em"
          />
        )}
      </div>
    </div>
  );
}

export default FilePreview;
