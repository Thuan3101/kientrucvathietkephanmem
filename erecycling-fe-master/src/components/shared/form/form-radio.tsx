import { Radio } from "antd";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control;
  fieldError: FieldError;
  options: Array<{
    key: string;
    label: string;
  }>;
};

const FormRadio = ({ name, label, control, fieldError, options }: Props) => {
  return (
    <div>
      {label && (
        <label className="inline-block mb-2 mr-2" htmlFor={name}>
          {label}{" "}
        </label>
      )}
      <Controller
        name={name}
        // defaultValue= {dayjs().toDate()}
        control={control}
        render={({ field }) => (
          <Radio.Group {...field}>
            {options.map((opt, idx) => {
              return (
                <Radio key={idx} value={opt.key}>
                  {opt.label}
                </Radio>
              );
            })}
          </Radio.Group>
        )}
      />
      {fieldError && <span className="inline-block mt-1 text-red-700">{fieldError.message}</span>}
    </div>
  );
};

export default FormRadio;
