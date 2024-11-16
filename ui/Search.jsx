import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { GoSearch, GoX } from "react-icons/go";
import { cn } from "../../lib/utils";

const Search = ({
  className,
  onSearch,
  fireOnChange,
  defaultValue,
  left,
  showClose,
  ...props
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(defaultValue || "");
  }, [defaultValue]);

  const onKeyPress = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(e.target.value, "enter");
    }
  };

  return (
    <Input
      {...props}
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        if (fireOnChange) onSearch(e.target.value);
      }}
      onKeyPress={onKeyPress}
      left={
        left ? (
          left
        ) : (
          <div
            className="absolute top-[50%] left-[8px]"
            style={{ transform: "translateY(-50%)" }}
          >
            <GoSearch size="1.125em" />
          </div>
        )
      }
      right={
        query &&
        (!fireOnChange || showClose) && (
          <div
            onClick={() => {
              setQuery("");
              if (onSearch) onSearch("", "clear");
            }}
            className="cursor-pointer absolute top-[50%] right-[8px]"
            style={{ transform: "translateY(-50%)" }}
          >
            <GoX size="1.125em" />
          </div>
        )
      }
      className={cn("bg-slate-100 h-9 pl-9", className)}
    />
  );
};

export default Search;
