import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaStar } from "react-icons/fa"; // Import a star icon from react-icons
import { InputFieldProps } from "../InputField";

const InputRating = ({
  label,
  name,
  className,
  disabled,
  required = false,
}: Omit<InputFieldProps, "form">) => {
  const [hover, setHover] = useState<number | null>(null);
  const form = useFormContext();

  if (!form) {
    throw new Error("InputRating must be used within a FormProvider");
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
              "text-sm font-medium",
              "transition-colors duration-200",
              "group-hover:text-primary",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex space-x-1 justify-around">
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                const isActive = starValue <= (hover ?? field.value);

                return (
                  <Button
                    key={index}
                    type="button"
                    variant="link"
                    onClick={() => field.onChange(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                    className={cn(
                      "p-1 relative group/star",
                      "transition-all duration-200",
                      "hover:scale-110"
                    )}
                  >
                    <FaStar
                      className={cn(
                        "text-2xl transition-all duration-200",
                        isActive ? "text-primary" : "text-gray-400",
                        "group-hover/star:text-primary/70"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute inset-0",
                        "transition-all duration-500",
                        "group-hover/star:animate-ping",
                        "opacity-0",
                        isActive ? "bg-primary/20" : "bg-gray-400/20",
                        "rounded-full"
                      )}
                    />
                  </Button>
                );
              })}
            </div>
          </FormControl>
          <FormMessage className="text-xs font-medium text-destructive mt-1 animate-in fade-in-50" />
        </FormItem>
      )}
    />
  );
};

export default InputRating;
