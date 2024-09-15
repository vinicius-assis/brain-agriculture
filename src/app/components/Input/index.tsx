import React from "react";

interface IInputProps {
  label: string;
  className?: string;
  placeholder?: string;
  type?: string;
}

const Input = ({
  label,
  className = "",
  placeholder = "",
  type = "text",
}: IInputProps) => {
  return (
    <div className={className} data-testid="input">
      <label
        className="block text-small-spacing font-normal mb-1 uppercase"
        htmlFor="grid-first-name"
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-off-white text-dark-green border-light rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-medium-green"
        id="grid-first-name"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
