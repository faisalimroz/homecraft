import React, { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface FormDatePickerProps {
  name: string;
  label?: string;
  onChange?: (date: dayjs.Dayjs, formattedDate: string) => void;
  size?: string;
  className?: string;
  minDate?: string;  
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  onChange,
  size = "large",
  className,
  minDate,  
}) => {
  const { control, setValue, formState: { errors } } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = dayjs(e.target.value);
    onChange?.(selectedDate, selectedDate.format("YYYY-MM-DD"));
    setValue(name, selectedDate.format("YYYY-MM-DD"));
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-black text-sm font-medium mb-1 "
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="date"
            value={field.value ? dayjs(field.value).format("YYYY-MM-DD") : ""}
            onChange={handleOnChange}
            className={`${className} block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1475c6] focus:border-[#1475c6] transition ease-in duration-200 sm:text-sm`}
            min={minDate}  
          />
        )}
      />
      {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default FormDatePicker;
