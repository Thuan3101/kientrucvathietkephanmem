import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: Props) => {
  return (
    <div
      className={`card bg-white text-text-primary overflow-hidden fon relative rounded-md p-6 border border-muted ${className}`}
    >
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default Card;
