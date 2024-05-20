import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const SecondaryButton = ({ className, children }: Props) => {
  return (
    <button
      className={`inline-block rounded-md min-h-[40px] bg-text-primary text-white cursor-pointer hover:bg-[rgb(69,_79,_91)] ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
