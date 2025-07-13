"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { BaseInputProps } from "../InputField";

const InputOTPController = <T extends FieldValues>({
  label,
  name,
  disabled = false,
  required = false,
  description,
  onComplete,
}: Omit<BaseInputProps<T>, "form">) => {
  const form = useFormContext<T>();

  if (!form) {
    throw new Error("InputOTPController must be used within a FormProvider");
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
            "group transition-all duration-300 ease-in-out"
          )}
        >
          <FormLabel
            className={cn(
              "text-sm font-medium transition-colors",
              "group-hover:text-primary",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <div className="w-full">
              <InputOTP
                maxLength={4}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                className="gap-2 w-full"
                onComplete={(data: string) => {
                  onComplete?.(data);
                }}
              >
                <InputOTPGroup className="gap-2 w-full">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className={cn(
                        "w-full h-14",
                        "rounded-md border-2",
                        "transition-all duration-200",
                        "focus:ring-2 focus:ring-primary/20",
                        "focus:border-primary",
                        "hover:border-primary/50",
                        "group-hover:shadow-sm",
                        "text-lg font-semibold"
                      )}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </FormControl>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          <FormMessage className="text-xs font-medium text-destructive mt-1 animate-in fade-in-50" />
        </FormItem>
      )}
    />
  );
};

export default React.memo(InputOTPController) as <T extends FieldValues>(
  props: Omit<BaseInputProps<T>, "form">
) => React.ReactNode;
