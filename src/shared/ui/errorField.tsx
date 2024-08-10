"use client";
import { useController } from "react-hook-form";

export const ErrorField = ({ name }: { name: string }) => {
  const {
    fieldState: { error },
  } = useController({ name });

  return (
    <>{error && <p className="text-red-600 mt-1 text-xs">{error.message}</p>}</>
  );
};
