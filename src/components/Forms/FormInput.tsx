import React from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface FormInputProps {
  name: string;
  type?: string;
  id?: string;
  placeholder?: string; // Optional for the placeholder
  label: string; // Required for the label
  className?: string; // For additional classes
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  type = "text",
  id,
  placeholder = "",
  label,
  className = "",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className={`relative ${className}`}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              {...field}
              className={`peer py-3 px-0 block w-full bg-transparent border-b-2 border-gray-300 text-sm 
                placeholder:text-transparent outline-none
                focus:border-b-[#4f46e5] focus:outline-none 
                focus:pt-5 focus:pb-2 
                [&:not(:placeholder-shown)]:pt-5 [&:not(:placeholder-shown)]:pb-2 
                autofill:pt-5 autofill:pb-2 transition-all duration-200 
                ${errorMessage ? "border-red-500" : ""}`}
            />
            <label
              htmlFor={id}
              className={`absolute top-0 left-0 py-4 h-full text-sm truncate pointer-events-none transition-all duration-200 
                origin-[0_0] dark:text-white 
                peer-disabled:opacity-50 peer-disabled:pointer-events-none 
                peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#4f46e5] 
                ${field.value ? "scale-75 -translate-y-4 text-[#4f46e5]" : "text-gray-500"}
                dark:peer-focus:text-neutral-500 
                dark:text-neutral-500`}
            >
              {label}
            </label>
          </>
        )}
      />
      {errorMessage && (
        <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormInput;
