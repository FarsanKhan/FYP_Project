import React from "react";
import { TypographyP } from "./typography";
import { GoTrash } from "react-icons/go";
import { iconProps } from "../../lib/utils";

const DeletedItem = ({ message }) => {
  return (
    <div className="bg-neutral-100 rounded-md lined-box-shadow px-4 py-3 flex items-center gap-4">
      <GoTrash {...iconProps} size="1.125em" />
      <TypographyP>{message}</TypographyP>
    </div>
  );
};

export default DeletedItem;
