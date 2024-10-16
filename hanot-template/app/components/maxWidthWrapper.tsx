import { cn } from "@/lib/utils";
import { ReactNode } from "react";
const MaxWidthWraper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      style={{ minHeight: `calc(100vh - 112px)` }}
      className={cn("mx-auto w-full max-w-screen-xl px-4 md:px-20 ", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWraper;
