import React from "react";
import Typography from "../Typography";

const EmptyMessage = () => {
  return (
    <div className="w-full text-center pt-20">
      <Typography className="text-lg tracking-wider text-gray-500">
        No data found
      </Typography>
    </div>
  );
};

export default EmptyMessage;
