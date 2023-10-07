import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full flex justify-center items-center transition-opacity duration-500",
        {
          "opacity-100": showLoading,
          "opacity-0 pointer-events-none": !showLoading,
          "bg-black": showLoading,
          "bg-transparent": !showLoading,
        }
      )}
    >
      <Loader2 size={32} className="animate-spin" />
    </div>
  );
};
