"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { InputFieldProps } from "../InputField";

const InputCheckbox = <T extends FieldValues>({
  label,
  name,
  className,
  disabled,
  required = false,
  description,
}: Omit<InputFieldProps<T>, "form">) => {
  const form = useFormContext<T>();

  if (!form) {
    throw new Error("InputCheckbox must be used within a FormProvider");
  }

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem
          className={cn(
            "w-full max-w-[400px]",
            "group transition-all duration-300 ease-in-out",
            className,
            "flex flex-col gap-4"
          )}
        >
          <div className="flex items-center gap-4 relative w-full">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className={cn(
                  "h-5 w-5 rounded-md",
                  "border-2 border-input",
                  "data-[state=checked]:border-primary",
                  "data-[state=checked]:bg-primary",
                  "transition-all duration-200",
                  "hover:border-primary/50",
                  "focus:ring-2 focus:ring-primary/20",
                  "group/check"
                )}
              />
            </FormControl>
            <FormLabel
              className={cn(
                "truncate flex justify-start !mt-0 w-full text-left",
                "text-sm font-medium transition-colors cursor-pointer",
                "group-hover:text-primary",
                required &&
                  "after:content-['*'] after:ml-0.5 after:text-red-500"
              )}
            >
              {label}
            </FormLabel>
            <div
              className={cn(
                "absolute left-0 w-5 h-5 rounded-md",
                "border-2 border-transparent",
                "transition-all duration-500",
                "group-hover:border-primary/20",
                "group-hover:scale-150 group-hover:opacity-0"
              )}
            />
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          <FormMessage className="text-xs font-medium text-destructive mt-1 animate-in fade-in-50" />
        </FormItem>
      )}
    />
  );
};

export default React.memo(InputCheckbox) as <T extends FieldValues>(
  props: Omit<InputFieldProps<T>, "form">
) => React.ReactNode;
