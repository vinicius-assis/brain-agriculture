import React from "react";
import Card from "../Card";
import Typography from "../Typography";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ITotalCardProps {
  title: string;
  value: string;
  percent: string;
  decrease?: boolean;
}

const TotalCard = ({ title, value, percent, decrease }: ITotalCardProps) => {
  return (
    <Card
      data-testid="total-card"
      className="max-w-52 max-h-28 w-full h-full px-4 py-2"
    >
      <Typography
        as="h3"
        className="text-small-spacing font-normal uppercase text-gray-500 mb-4"
      >
        {title}
      </Typography>
      <div className="flex justify-between items-center">
        <Typography className="text-2xl font-bold">{value}</Typography>
        <Typography
          className={`flex items-center text-sm font-medium ${
            decrease ? "text-red-000" : "text-normal-green"
          }`}
        >
          {`${!decrease ? "+" : "-"} ${percent}`}{" "}
          {!decrease ? (
            <ArrowUp data-testid="increase-icon" size={12} />
          ) : (
            <ArrowDown data-testid="decrease-icon" size={12} />
          )}
        </Typography>
      </div>
    </Card>
  );
};

export default TotalCard;
