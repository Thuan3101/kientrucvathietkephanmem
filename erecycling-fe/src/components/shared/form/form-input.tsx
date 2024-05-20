import { Input } from "antd";
import { Control, Controller, FieldError } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control;
  fieldError: FieldError;
};

const FormInput = ({ name, label, control, fieldError, placeholder }: Props) => {
  return (
    <div>
      {label && (
        <label className="inline-block mb-2" htmlFor={name}>
          {label}{" "}
        </label>
      )}
      {control ? (
        <>
          <Controller
            name={name}
            defaultValue=""
            control={control}
            render={({ field }) => <Input size="large" id={name} {...field} placeholder={placeholder} />}
          />
          {fieldError && <span className="inline-block mt-1 text-red-700">{fieldError.message}</span>}
        </>
      ) : (
        <>
          <Input size="large" id={name} placeholder={placeholder} />
        </>
      )}
    </div>
  );
};

export default FormInput;
