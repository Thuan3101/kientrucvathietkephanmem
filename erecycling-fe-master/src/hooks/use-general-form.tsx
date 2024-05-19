import { yupResolver } from "@hookform/resolvers/yup";
import { ComponentProps } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  UseFormProps as UseHookFormProps,
  useForm,
} from "react-hook-form";
import { ObjectSchema } from "yup";

interface UseGeneralFormProps<T extends ObjectSchema<any>> extends UseHookFormProps<T> {
  schema: T;
}

interface FormProps<T extends FieldValues = any> extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export const useGeneralForm = <T extends ObjectSchema<any>>({
  schema,
  ...formConfig
}: UseGeneralFormProps<T>) => {
  return useForm({
    ...formConfig,
    resolver: yupResolver(schema),
  });
};

export const GeneralForm = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      {/* the `form` passed here is return value of useForm() hook */}
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
      </form>
    </FormProvider>
  );
};
