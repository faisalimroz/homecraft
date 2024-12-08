"use client";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

interface IInput {
  options?: SelectOptions[];
  name: string;
  value?: string | string[] | undefined;
  label?: string;
  defaultValue?: SelectOptions;
  className?: string;
  size?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormSelectField = ({
  name,
  value,
  options,
  size = "large",
  label,
  defaultValue,
  className,
  onChange,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-black text-sm font-medium mb-1  "
        >
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <select
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className={`${className}  block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#1475c6] focus:border-[#1475c6] transition ease-in duration-200 sm:text-sm`}
          >
            {/* Add an empty option as a placeholder */}
            <option value="">
           {label? `Select ${label}` :"Select Category" }  
            </option>
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                selected={value === option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errorMessage && (
        <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormSelectField;
