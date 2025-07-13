"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "../InputField";

const InputPassword: FC<Omit<InputFieldProps, "form">> = (props) => {
  const {
    label,
    name,
    placeholder,
    className,
    disabled = false,
    Icon,
    iconClassName,
    required = false,
    description,
  } = props;

  const form = useFormContext();

  if (!form) {
    throw new Error("InputPassword must be used within a FormProvider");
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
            className
          )}
        >
          <FormLabel
            className={cn(
              "text-sm font-medium",
              "transition-colors duration-200",
              "group-hover:text-primary",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              {Icon && (
                <Icon
                  size={10}
                  className={cn(
                    "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                    iconClassName
                  )}
                />
              )}

              <Input
                type={showPassword ? "text" : "password"}
                className={cn(
                  "w-full h-11",
                  "transition-all duration-200",
                  "border-2 focus:border-primary",
                  "hover:border-primary/50",
                  "rounded-md shadow-sm",
                  "placeholder:text-muted-foreground/50",
                  "focus:ring-2 focus:ring-primary/20",
                  "pl-10"
                )}
                placeholder={placeholder}
                {...field}
              />

              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
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

export default InputPassword;
