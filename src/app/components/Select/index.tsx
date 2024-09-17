import React from "react";
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
}

const SelectInput = <T extends FieldValues>({
  label,
  register,
  name,
  options,
  errors,
  isMulti = false,
  menuPlacement = "bottom",
}: ISelectProps<T>) => {
  const formattedOptions = options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const handleChange = (
    selectedOption: SingleValue<SelectOption> | MultiValue<SelectOption> | null
  ) => {
    if (isMulti) {
      const values = selectedOption
        ? (selectedOption as MultiValue<SelectOption>).map(
            (option) => option.value
          )
        : [];
      register(name).onChange({ target: { name, value: values } });
    } else {
      const value = selectedOption
        ? (selectedOption as SingleValue<SelectOption>)?.value
        : "";
      register(name).onChange({ target: { name, value } });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-small-spacing font-normal mb-1 uppercase">
        {label}
      </label>
      <Select
        isMulti={isMulti}
        options={formattedOptions}
        onChange={handleChange}
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
