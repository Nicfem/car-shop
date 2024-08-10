import {
  Input as InputHeadlessUi,
  InputProps as InputPropsHeadlessUi,
} from "@headlessui/react";
import { useController } from "react-hook-form";
import { ErrorField } from "./errorField";

interface InputProps extends InputPropsHeadlessUi {
  name: string;
}

export const Input: React.FC<InputProps> = ({ name, type, ...props }) => {
  const { field } = useController({ name });

  return (
    <>
      <InputHeadlessUi
        className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        type={type}
        {...field}
        autoComplete="off"
        {...props}
      />
      <ErrorField name={name} />
    </>
  );
};
