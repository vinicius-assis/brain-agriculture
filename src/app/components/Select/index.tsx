import React from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

interface ISelectProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  options: { value: string; label: string }[];
  errors?: FieldErrors<T>;
}

const Select = <T extends FieldValues>({
  label,
  register,
  name,
  options,
  errors,
}: ISelectProps<T>) => {
  return (
    <div className="mb-4">
      <label
        className="block text-small-spacing font-normal mb-1 uppercase"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        {...register(name)}
        id={name}
        defaultValue=""
        className="appearance-none block w-full bg-off-white text-dark-green border-light rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-medium-green"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[name]?.message && (
        <p className="text-red-500">
          {errors[name]?.message as React.ReactNode}
        </p>
      )}
    </div>
  );
};

export default Select;
