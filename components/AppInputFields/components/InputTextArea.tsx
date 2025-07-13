import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "../InputField";

const InputTextArea = (props: Omit<InputFieldProps, "form">) => {
  const {
    label,
    name,
    placeholder,
    className,
    disabled,
    Icon,
    iconClassName,
    description,
  } = props;

  const form = useFormContext();

  if (!form) {
    throw new Error("InputTextArea must be used within a FormProvider");
  }

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => {
        return (
          <FormItem
            className={`sm:max-w-[300px] sm:min-w-[250px] min-w-[70vw] ${className}`}
          >
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                {Icon && (
                  <Icon
                    size={10}
                    className={cn(
                      "absolute left-3 z-0 top-5 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                      iconClassName
                    )}
                  />
                )}

                <Textarea
                  className={cn("dark:focus:ring-white h-11", "pl-10")}
                  placeholder={placeholder}
                  {...field}
                />
              </div>
            </FormControl>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputTextArea;
