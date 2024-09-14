import React from "react";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "md" | "sm";
}

const Button = ({ children, className = "", variant = "md" }: IButtonProps) => {
  const buttonSize =
    variant === "md"
      ? "w-52 h-10 text-base-semi"
      : "w-32 h-9 text-small-medium font-semibold";

  return (
    <button
      className={`flex justify-center items-center bg-medium-green text-white rounded-lg cursor-pointer hover:bg-medium-green/80 transition ease-out ${className} ${buttonSize} `}
    >
      {children}
    </button>
  );
};

export default Button;
