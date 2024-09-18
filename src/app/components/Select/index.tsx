import React, { useCallback, useEffect, useMemo, useState } from "react";
import Select, { SingleValue, MultiValue } from "react-select";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface ISelectProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  options: SelectOption[];
  errors?: FieldErrors<T>;
  isMulti?: boolean;
  menuPlacement?: "bottom" | "auto" | "top";
  defaultValue?: any;
}

const SelectInput = <T extends FieldValues>({
  label,
  register,
  name,
  options,
  errors,
  isMulti = false,
  menuPlacement = "bottom",
  defaultValue = [],
}: ISelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const getDefaultValue = useMemo(() => {
    if (isMulti) {
      return defaultValue.map((value: string) =>
        options.find((option) => option.value === value)
      );
    }
    return options.find((option) => option.value === defaultValue) || null;
  }, [defaultValue, name, isMulti, options]);

  const handleChange = useCallback(
    (
      selectedOption:
        | SingleValue<SelectOption>
        | MultiValue<SelectOption>
        | null
    ) => {
      if (isMulti) {
        const values = selectedOption
          ? (selectedOption as MultiValue<SelectOption>).map(
              (option) => option.value
            )
          : [];
        register(name).onChange({ target: { name, value: values } });
        setSelectedValue(selectedOption);
      } else {
        const value = selectedOption
          ? (selectedOption as SingleValue<SelectOption>)?.value
          : "";
        register(name).onChange({ target: { name, value } });
        setSelectedValue(selectedOption);
      }
    },
    [setSelectedValue]
  );

  useEffect(() => {
    if (getDefaultValue?.length || getDefaultValue?.value) {
      setSelectedValue(getDefaultValue);
    }
  }, [getDefaultValue]);

  return (
    <div className="mb-4">
      <label className="block text-small-spacing font-normal mb-1 uppercase">
        {label}
      </label>
      <Select
        isMulti={isMulti}
        options={options}
        onChange={handleChange}
        value={selectedValue}
        classNamePrefix="select"
        placeholder={`Select ${label}`}
        menuPlacement={menuPlacement}
      />
      {errors && errors[name]?.message && (
        <p className="text-red-500">
          {errors[name]?.message as React.ReactNode}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
