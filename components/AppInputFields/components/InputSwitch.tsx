"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";

interface InputSwitchProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  description?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  Icon: LucideIcon | IconType;
}

const InputSwitch = <T extends FieldValues>({
  label,
  name,
  description,
  className,
  disabled = false,
  required = false,
  Icon,
}: InputSwitchProps<T>) => {
  const form = useFormContext<T>();

  if (!form) {
    throw new Error("InputSwitch must be used within a FormProvider");
  }

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between rounded-lg border p-4 group transition-all duration-300 ease-in-out hover:border-primary",
            className
          )}
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="text-muted-foreground transition-colors group-hover:text-primary">
                <Icon size={20} />
              </div>
            )}
            <div className="space-y-0.5">
              <FormLabel
                className={cn(
                  "text-base transition-colors group-hover:text-primary",
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-destructive"
                )}
              >
                {label}
              </FormLabel>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="text-xs font-medium text-destructive mt-1 animate-in fade-in-50" />
        </FormItem>
      )}
    />
  );
};

export default InputSwitch;
