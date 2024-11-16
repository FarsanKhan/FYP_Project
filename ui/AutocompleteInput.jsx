import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { TypographyP } from "./typography";
import { cn } from "../../lib/utils";

const AutocompleteInput = ({
  onChange,
  options: outerOptions,
  freeSolo,
  size = "w-[372px]",
  defaultValue = "",
  renderInput,
  ...props
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [options, setOptions] = useState([]);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    if (outerOptions) setOptions(outerOptions);
  }, [outerOptions]);

  function handleKeyDown(e) {
    if (!options) return;
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    if (e.key === "ArrowDown") {
      if (cursor == null) {
        setCursor(0);
      } else if (cursor !== filteredOptions.length - 1) {
        setCursor(cursor + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (cursor && cursor < filteredOptions.length) {
        setCursor(cursor - 1);
      }
    } else if (e.key === "Enter" && cursor !== null) {
      e.preventDefault();
      setOpen(false);
      setSelected(filteredOptions[cursor].value);
      setQuery(filteredOptions[cursor].label);
      if (onChange) onChange(filteredOptions[cursor].value);
    }
  }

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        if (!freeSolo && !selected && !o) {
          setTimeout(() => {
            setQuery("");
          }, 0);
        }
        if (!o) {
          setOpen(o);
          setCursor(null);
        }
      }}
    >
      <PopoverTrigger>
        {typeof renderInput === "function" ? (
          renderInput({
            ...props,
            autoComplete: "off",
            onKeyDown: handleKeyDown,
            value: query,
            onChange: (e) => {
              if (e.target.value) {
                if (!open) setOpen(true);
              }
              setCursor(null);
              setQuery(e.target.value);
            },
          })
        ) : (
          <Input
            {...props}
            autoComplete="off"
            onKeyDown={handleKeyDown}
            value={query}
            onChange={(e) => {
              if (e.target.value) {
                if (!open) setOpen(true);
              }
              setCursor(null);
              setQuery(e.target.value);
            }}
          />
        )}
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        className={cn("p-0 max-h-[250px] overflow-auto", size)}
        sideOffset={0}
      >
        <ul className="p-0">
          {options
            .filter((option) =>
              option.label.toLowerCase().includes(query.toLowerCase())
            )
            .map((option, index) => (
              <li
                onClick={() => {
                  setOpen(false);
                  setQuery(option.value);
                  setSelected(option.value);
                  if (onChange) onChange(option.value);
                }}
                key={option.value}
                className={cn(
                  "hover:bg-neutral-100 cursor-pointer p-2 border-b border-b-neutral-200",
                  cursor === index ? "bg-neutral-100" : ""
                )}
              >
                <TypographyP className="text-sm">{option.label}</TypographyP>
              </li>
            ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default AutocompleteInput;
