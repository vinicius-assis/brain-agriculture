import React from "react";

interface ITypographyProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
}

const Typography = ({
  children,
  as = "p",
  className = "",
}: ITypographyProps) => {
  const Component = as;
  return <Component className={`${className}`}>{children}</Component>;
};

export default Typography;
