"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import { InputFieldProps } from "../InputField";

const InputSelect: React.FC<Omit<InputFieldProps, "form">> = (props) => {
  const {
    label,
    name,
    placeholder,
    className,
    disabled,
    Icon,
    options,
    description,
    required,
    isSearchable = false,
  } = props;
  const form = useFormContext();

  if (!form) {
    throw new Error("InputSelect must be used within a FormProvider");
  }

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: "44px",
      minHeight: "44px",
      border: state.isFocused
        ? "2px solid var(--primary)"
        : "2px solid var(--input)",
      borderRadius: "var(--radius)",
      backgroundColor: disabled ? "var(--muted)" : "transparent",
      boxShadow: state.isFocused ? "0 0 0 2px var(--primary)/0.2" : "none",
      transition: "all 200ms ease",
      "&:hover": {
        borderColor: "var(--primary)",
        cursor: "pointer",
      },
      paddingLeft: "38px",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: "0 12px",
      paddingLeft: "0",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "var(--foreground)",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "var(--foreground)",
      transition: "color 200ms ease",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--background)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      animation: "scaleIn 200ms ease",
      boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      overflow: "hidden",
      zIndex: 9999,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--primary)"
        : state.isFocused
        ? "var(--accent)"
        : "transparent",
      color: state.isSelected
        ? "var(--primary-foreground)"
        : "var(--foreground)",
      cursor: "pointer",
      transition: "all 150ms ease",
      "&:hover": {
        backgroundColor: state.isSelected ? "var(--primary)" : "var(--accent)",
        transform: "translateX(4px)",
      },
      zIndex: 9999,
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      transition: "transform 200ms ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      color: state.isFocused ? "var(--primary)" : "var(--muted-foreground)",
      "&:hover": {
        color: "var(--primary)",
      },
    }),
  };

  // Sort options by label in ascending order
  const sortedOptions = React.useMemo(() => {
    if (!options) return [];
    return props.is_sorted
      ? [...options].sort((a, b) => a.label.localeCompare(b.label))
      : options;
  }, [options, props.is_sorted]);

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
            <div className="flex items-center relative w-full">
              {Icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-0 transition-colors group-hover:text-primary">
                  <Icon size={20} />
                </div>
              )}
              <Select
                menuPlacement="auto"
                {...field}
                isDisabled={disabled}
                options={sortedOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                placeholder={placeholder}
                className="w-full"
                styles={customStyles}
                value={sortedOptions.find((opt) => opt.value === field.value)}
                onChange={(newValue: any) => field.onChange(newValue?.value)}
                components={{
                  IndicatorSeparator: () => null,
                }}
                isSearchable={isSearchable}
                menuShouldScrollIntoView={false}
                instanceId={`select-${name}`}
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

export default InputSelect;
