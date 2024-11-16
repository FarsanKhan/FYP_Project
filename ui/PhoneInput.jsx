import React from "react";
import { Input } from "./input";
import { TypographyP } from "./typography";

const PhoneInput = (props) => {
  return (
    <Input
      {...props}
      left={
        <div
          className="absolute flex items-center gap-2 top-[50%]"
          style={{
            transform: "translateY(-50%)",
            left: props.preview ? 0 : 10,
          }}
        >
          {!props.preview && (
            <img width={20} height={20} alt="PK" src="/PK.svg" />
          )}
          <TypographyP className="text-sm">+92</TypographyP>
        </div>
      }
      style={{ paddingLeft: props.preview ? 27 : 66 }}
      type="number"
      onKeyPress={(e) => {
        if (!/([0-9])/g.test(e.key) || e.target.value.length > 9) {
          e.preventDefault();
        }
      }}
    />
  );
};

export default PhoneInput;
