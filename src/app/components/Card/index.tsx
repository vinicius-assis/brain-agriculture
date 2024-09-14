import React from "react";

interface ICardProps {
  content: React.ReactNode;
}

const Card = ({ content }: ICardProps) => {
  return (
    <div className="border-light shadow-sm" data-testid="card">
      {content}
    </div>
  );
};

export default Card;
