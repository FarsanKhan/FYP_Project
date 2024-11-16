import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "./label";
import { TypographyMuted } from "./typography";
import { cn } from "../../lib/utils";

const SelectInput = ({
  options = [],
  placeholder,
  required,
  className,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  label,
  dynamicDefaultValue,
}) => {
  const [selectValue, setSelectValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue && dynamicDefaultValue) {
      setSelectValue(defaultValue);
    }
  }, [defaultValue, dynamicDefaultValue]);

  return (
    <div>
      {label && <Label className="mb-1">{label}</Label>}
      <Select
        required={required}
        name={name}
        defaultValue={defaultValue}
        value={dynamicDefaultValue ? selectValue : value}
        disabled={disabled}
        onValueChange={dynamicDefaultValue ? setSelectValue : onChange}
      >
        <SelectTrigger className={cn("select-trigger", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              value={option.value}
              key={option.value}
              disabled={option.disabled}
            >
              <div>
                {option.label}
                {option.description && (
                  <TypographyMuted className="text-sm option-description">
                    {option.description}
                  </TypographyMuted>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
