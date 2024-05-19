import { DatePicker } from "antd";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control;
  fieldError?: FieldError;
};

const FormDatePicker = ({ name, control, label, placeholder, fieldError }: Props) => {
  return (
    <div>
      {label && (
        <label className="inline-block mb-2" htmlFor={name}>
          {label}{" "}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker {...field} onChange={(e) => field.onChange(e)} placeholder={placeholder} className="block" size="large" />
        )}
      />
      {fieldError && <span className="inline-block mt-1 text-red-700">{fieldError.message}</span>}
    </div>
  );
};

export default FormDatePicker;
