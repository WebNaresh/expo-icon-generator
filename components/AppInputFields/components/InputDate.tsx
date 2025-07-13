"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { BaseInputProps } from "../InputField";

const InputDate = <T extends FieldValues>({
  label,
  name,
  placeholder,
  className,
  disabled = false,
  required = false,
  description,
}: Omit<BaseInputProps<T>, "form">) => {
  const form = useFormContext<T>();
  const [open, setOpen] = React.useState(false);

  if (!form) {
    throw new Error("InputDate must be used within a FormProvider");
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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal",
                        "flex items-center justify-start gap-2",
                        "border-2 hover:border-primary/50",
                        "transition-all duration-200",
                        "shadow-sm hover:shadow",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="h-5 w-5 opacity-50 transition-transform group-hover:text-primary" />
                      {field.value ? (
                        <span className="transition-colors group-hover:text-primary">
                          {format(new Date(field.value), "PPP")}
                        </span>
                      ) : (
                        <span>{placeholder || "Pick a date"}</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(format(date, "yyyy-MM-dd"));
                        setOpen(false);
                      } else {
                        field.onChange("");
                      }
                    }}
                    disabled={(date: Date) => date < new Date("1900-01-01")}
                    initialFocus
                    className="rounded-md border-2 shadow-lg"
                  />
                </PopoverContent>
              </Popover>
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

export default React.memo(InputDate) as <T extends FieldValues>(
  props: Omit<BaseInputProps<T>, "form">
) => React.ReactNode;
