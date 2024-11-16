import React, { useState } from "react";
import { iconProps } from "../../lib/utils";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TypographyMuted, TypographyP } from "./typography";

function Question({ question, answer }) {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="bg-[#FCFCFC] max-w-[1072px] w-full border rounded-[12px] border-[#B3B3B3] p-[20px] flex flex-col gap-[10px]">
      <div
        className="cursor-pointer flex items-center justify-between"
        onClick={() => setCollapse(!collapse)}
      >
        <TypographyP>{question}</TypographyP>
        {collapse ? (
          <FaChevronUp {...iconProps} size="1em" />
        ) : (
          <FaChevronDown {...iconProps} size="1em" />
        )}
      </div>
      {collapse && <TypographyMuted>{answer}</TypographyMuted>}
    </div>
  );
}

export default Question;
