import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface FormTextAreaProps {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  label,
  rows = 3,
  value,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);


  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="block text-black text-sm font-medium mb-1 "
        >
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            id={name}
            rows={rows}
            placeholder={placeholder}
            className={`mt-1 p-2 w-full border rounded-md transition-colors duration-300 ${
              isFocused ? "border-blue-600" : errorMessage ? "border-red-500" : "border-gray-300"
            } focus:outline-none`}
            {...field}
            defaultValue={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
      />
      {errorMessage && (
        <p className="text-red-500 my-2">{errorMessage}</p>
      )}
    </>
  );
};

export default FormTextArea;
