"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FieldValues, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import { BaseInputProps } from "../InputField";

interface Option {
  value: string | null;
  label: string;
}

interface InputRadioProps<T extends FieldValues = any>
  extends Omit<BaseInputProps<T>, "form"> {
  options?: Option[];
  Icon?: LucideIcon | IconType;
  iconClassName?: string;
  description?: string;
}

const InputRadio = <T extends FieldValues>({
  label,
  name,
  options = [],
  className,
  Icon,
  iconClassName,
  required = false,
  description,
}: InputRadioProps<T>) => {
  const form = useFormContext<T>();

  if (!form) {
    throw new Error("InputRadio must be used within a FormProvider");
  }

  // Calculate grid columns based on options length
  const getGridClass = () => {
    if (options.length <= 2) return "grid-cols-2";
    if (options.length <= 4) return "grid-cols-1";
    return "grid-cols-3";
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "w-full max-w-[400px]",
            "group transition-all duration-300 ease-in-out",
            className
          )}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              {Icon && (
                <Icon
                  className={cn(
                    "h-4 w-4 text-muted-foreground",
                    "transition-colors duration-200",
                    "group-hover:text-primary",
                    iconClassName
                  )}
                />
              )}
              <Label
                className={cn(
                  "text-sm font-medium",
                  "transition-colors duration-200",
                  "group-hover:text-primary",
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
              >
                {label}
              </Label>
            </div>
            {description && (
              <p className="text-xs text-muted-foreground pl-6">
                {description}
              </p>
            )}
          </div>
          <FormControl>
            <div className="relative w-full min-h-[40px] flex items-start py-2">
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className={cn("grid w-full gap-4", getGridClass())}
              >
                {options.map((option) => (
                  <div
                    key={option.value ?? "all"}
                    className={cn("flex items-center space-x-2", "group/radio")}
                  >
                    <RadioGroupItem
                      value={option.value ?? ""}
                      id={`${name}-${option.value ?? "all"}`}
                      className={cn(
                        "h-4 w-4",
                        "border border-input",
                        "data-[state=checked]:border-primary",
                        "data-[state=checked]:text-primary",
                        "transition-colors duration-200",
                        "focus:ring-2 focus:ring-primary/20"
                      )}
                    />
                    <Label
                      htmlFor={`${name}-${option.value ?? "all"}`}
                      className={cn(
                        "text-sm font-normal leading-none",
                        "transition-colors duration-200",
                        "cursor-pointer",
                        "group-hover/radio:text-primary",
                        "peer-disabled:cursor-not-allowed",
                        "peer-disabled:opacity-70"
                      )}
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </FormControl>
          <FormMessage className="text-xs font-medium text-destructive mt-1 animate-in fade-in-50" />
        </FormItem>
      )}
    />
  );
};

export default InputRadio as <T extends FieldValues>(
  props: InputRadioProps<T>
) => React.ReactNode;
