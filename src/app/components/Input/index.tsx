import React from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

interface IInputProps<T extends FieldValues> {
  label: string;
  className?: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  label,
  className = "",
  placeholder = "",
  type = "text",
  register,
  name,
  errors,
}: IInputProps<T>) => {
  return (
    <div className={className} data-testid="input">
      <label
        className="block text-small-spacing font-normal mb-1 uppercase"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-off-white text-dark-green border-light rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-medium-green"
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors && errors[name]?.message && (
        <p className="text-red-500">
          {errors[name]?.message as React.ReactNode}
        </p>
      )}
    </div>
  );
};

export default Input;
