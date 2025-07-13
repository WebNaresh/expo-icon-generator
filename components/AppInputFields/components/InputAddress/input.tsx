import { FormField } from "@/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "../../InputField";
import AddressInput from "./components/mini_form";

const InputAddress: React.FC<Omit<InputFieldProps, "form">> = (props) => {
  const { name } = props;
  const form = useFormContext();

  if (!form) {
    throw new Error("InputAddress must be used within a FormProvider");
  }

  // API loading is now handled by mini_form.tsx and the central loader

  return (
    <FormField
      disabled={props.disabled}
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <AddressInput
            field={field}
            inputProps={{
              ...props,
              Icon: props.Icon,
            }}
          />
        );
      }}
    />
  );
};

export default React.memo(InputAddress);
