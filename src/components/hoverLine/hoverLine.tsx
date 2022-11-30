import { ComponentProps } from "react";

type HoverLineProps = {
  className?: ComponentProps<"div">["className"];
};

const HoverLine = ({ className }: HoverLineProps) => {
  return <div className={`absolute w-full group-hover:h-1 ${className}`}></div>;
};

export default HoverLine;
