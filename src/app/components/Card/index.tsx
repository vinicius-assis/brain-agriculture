import React from "react";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: ICardProps) => {
  return (
    <div className={`border-light shadow-sm ${className}`} data-testid="card">
      {children}
    </div>
  );
};

export default Card;
