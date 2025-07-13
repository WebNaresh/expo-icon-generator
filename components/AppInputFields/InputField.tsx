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
import { LucideIcon } from "lucide-react";
import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import InputAddress from "./components/InputAddress/input";
import InputCheckbox from "./components/InputCheckBox";
import InputDate from "./components/InputDate";
import ImageInput from "./components/InputImage/InputImageAvatar";
import InputMultiSelect from "./components/InputMultiSelect";
import InputMultiSelectNonCreatable from "./components/InputMultiSelectNonCreatable";
import InputOTPController from "./components/InputOTP";
import InputPassword from "./components/InputPassword";
import InputPhone from "./components/InputPhone";
import InputRadio from "./components/InputRadio";
import InputRating from "./components/InputRating";
import InputSelect from "./components/InputSelect";
import InputSwitch from "./components/InputSwitch";
import ModernImageInput from "./components/ModernImageInput";
import MultiImageInput from "./components/multiImageInput";

// Base type for form values
type DefaultFormValues = Record<string, unknown>;

export interface BaseInputProps<T extends FieldValues = DefaultFormValues> {
  label?: string;
  name: Path<T>;
  placeholder?: string;
  description?: string;
  type:
    | "text"
    | "password"
    | "email"
    | "OTP"
    | "avatar"
    | "number"
    | "file"
    | "select"
    | "multiSelect"
    | "multiSelectNonCreatable"
    | "multiSelect_images"
    | "rating"
    | "places_autocomplete"
    | "text-area"
    | "date"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "yes_no_radio"
    | "switch"
    | "phone"
    | "modern-image";
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
  onComplete?: (data: any) => void;
}

export interface InputFieldProps<T extends FieldValues = DefaultFormValues>
  extends BaseInputProps<T> {
  options?: {
    value: string | null;
    label: string;
  }[];
  async_function?: (
    input: string
  ) => Promise<{ value: string; label: string }[]>;
  Icon: LucideIcon | IconType;
  iconClassName?: string;
  is_sorted?: true | false;
  isSearchable?: boolean;
}

const InputField = <T extends FieldValues>({
  label,
  name,
  placeholder,
  type,
  className,
  disabled = false,
  autoComplete = "off",
  Icon,
  iconClassName,
  required = false,
  options,
  description,
  isSearchable,
  is_sorted = false,
  onComplete,
}: InputFieldProps<T>) => {
  const form = useFormContext<T>();

  if (!form) {
    throw new Error("InputField must be used within a FormProvider");
  }

  if (type === "OTP") {
    return (
      <InputOTPController
        label={label}
        name={name}
        disabled={disabled}
        required={required}
        type={type}
        description={description}
        onComplete={onComplete}
      />
    );
  }

  if (type === "modern-image") {
    return (
      <ModernImageInput
        label={label}
        name={name}
        className={className}
        required={required}
        description={description}
      />
    );
  }

  if (type === "avatar") {
    return (
      <ImageInput
        label={label}
        name={name}
        className={className}
        disabled={disabled}
        required={required}
        type={type}
        description={description}
      />
    );
  }

  if (type === "select" && options) {
    return (
      <InputSelect
        label={label}
        name={name}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        Icon={Icon}
        options={options}
        required={required}
        type={type}
        description={description}
        isSearchable={isSearchable}
        is_sorted={is_sorted}
      />
    );
  }

  if (type === "multiSelect" && options) {
    return (
      <InputMultiSelect
        label={label}
        name={name}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        Icon={Icon}
        options={options}
        required={required}
        type={type}
        description={description}
      />
    );
  }

  if (type === "multiSelectNonCreatable" && options) {
    return (
      <InputMultiSelectNonCreatable
        label={label}
        name={name}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        Icon={Icon}
        options={options}
        required={required}
        type={type}
        description={description}
      />
    );
  }

  if (type === "multiSelect_images") {
    return (
      <MultiImageInput
        label={label}
        name={name}
        required={required}
        type={type}
        description={description}
      />
    );
  }

  if (type === "rating") {
    return (
      <InputRating
        label={label}
        name={name}
        className={className}
        disabled={disabled}
        required={required}
        type={type}
        description={description}
        Icon={Icon}
      />
    );
  }

  if (type === "places_autocomplete") {
    return (
      <InputAddress
        label={label}
        name={name}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        required={required}
        type={type}
        description={description}
        Icon={Icon}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <InputCheckbox
        label={label}
        name={name}
        className={className}
        disabled={disabled}
        required={required}
        type={type}
        description={description}
        Icon={Icon}
      />
    );
  }

  if (type === "radio" && options) {
    return (
      <InputRadio
        label={label}
        name={name}
        options={options}
        className={className}
        Icon={Icon}
        iconClassName={iconClassName}
        required={required}
        type={type}
        description={description}
      />
    );
  }

  if (type === "yes_no_radio") {
    return (
      <InputRadio
        label={label}
        name={name}
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        className={className}
        Icon={Icon}
        iconClassName={iconClassName}
        required={required}
        type="radio"
        description={description}
      />
    );
  }

  if (type === "password") {
    return (
      <InputPassword
        label={label}
        name={name}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        Icon={Icon}
        iconClassName={iconClassName}
        required={required}
        type={type}
        description={description}
      />
    );
  }

  if (type === "date") {
    return (
      <InputDate
        label={label}
        name={name}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        required={required}
        type={type}
        description={description}
      />
    );
  }

  if (type === "switch") {
    return (
      <InputSwitch
        label={label || ""}
        name={name}
        description={description}
        className={className}
        disabled={disabled}
        required={required}
        Icon={Icon}
      />
    );
  }

  if (type === "phone") {
    return (
      <InputPhone
        label={label}
        name={name}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        required={required}
        type={type}
        description={description}
        Icon={Icon}
        iconClassName={iconClassName}
      />
    );
  }

  if (type === "datetime-local") {
    return (
      <FormField
        control={form.control}
        name={name}
        disabled={disabled}
        render={({ field }) => (
          <FormItem className={cn("w-full max-w-[400px]", className)}>
            <FormLabel
              className={cn(
                "text-sm font-medium",
                required &&
                  "after:content-['*'] after:ml-0.5 after:text-red-500"
              )}
            >
              {label}
            </FormLabel>
            <FormControl>
              <input
                type="datetime-local"
                className="w-full h-11 border-2 rounded-md shadow-sm px-3 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                {...field}
              />
            </FormControl>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
            <FormMessage className="text-xs font-medium text-destructive mt-1 animate-in fade-in-50" />
          </FormItem>
        )}
      />
    );
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
            className
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
            <div className="relative w-full">
              {Icon && (
                <Icon
                  size={10}
                  className={cn(
                    "absolute z-0 left-3 top-1/2 h-4 w-4 -translate-y-1/2",
                    "text-muted-foreground transition-colors duration-200",
                    "group-hover:text-primary",
                    iconClassName
                  )}
                />
              )}
              <Input
                autoComplete={autoComplete}
                size={6}
                onWheel={(e) => e.currentTarget.blur()}
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
                type={type}
                placeholder={placeholder}
                {...field}
              />
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

export default React.memo(InputField) as <T extends FieldValues>(
  props: InputFieldProps<T>
) => React.ReactNode;
