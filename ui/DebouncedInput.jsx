import React, { useCallback } from "react";
import debounce from "lodash.debounce";
import Search from "./Search";

const DebouncedInput = ({ value: initialValue, onChange, ...props }) => {
  const handleChange = useCallback(
    debounce((value) => {
      if (onChange) onChange(value);
    }, 500),
    []
  );

  return (
    <Search
      {...props}
      fireOnChange
      defaultValue={initialValue}
      onSearch={handleChange}
    />
  );
};

export default DebouncedInput;
