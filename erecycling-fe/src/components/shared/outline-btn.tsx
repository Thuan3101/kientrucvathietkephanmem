import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const OutlineBtn = ({ children, className }: Props) => {
  return (
    <button
      className={`inline-block min-h-[40px] bg-#fff text-text-soft  px-4 py-2 text-sm h-10 rounded-md bg-transparent border 
      hover:text-primary hover:border-primary border-muted cursor-pointer  ${className}`}
    >
      {children}
    </button>
  );
};

export default OutlineBtn;
