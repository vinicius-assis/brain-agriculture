import React from "react";

interface ITypographyProps {
  content: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
}

const Typography = ({
  content,
  as = "p",
  className = "",
}: ITypographyProps) => {
  const Component = as;
  return <Component className={`${className}`}>{content}</Component>;
};

export default Typography;
