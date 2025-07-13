"use client";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import * as React from "react";

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  children: React.ReactNode;
}

export function Stepper({
  activeStep,
  children,
  className,
  ...props
}: StepperProps) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<StepProps>[];
  const steps = childrenArray.map((step, index) => {
    return React.cloneElement(step, {
      index,
      active: index === activeStep,
      completed: index < activeStep,
      last: index === childrenArray.length - 1,
    });
  });

  return (
    <div
      className={cn("flex items-center w-full relative", className)}
      {...props}
    >
      {steps}
      <div className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full -z-10"></div>
      <div
        className="absolute top-5 left-0 h-0.5 bg-green-500 -z-10 transition-all duration-500 ease-in-out"
        style={{
          width: `${
            (activeStep / (React.Children.count(children) - 1)) * 100
          }%`,
        }}
      ></div>
    </div>
  );
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  active?: boolean;
  completed?: boolean;
  last?: boolean;
  label: string;
  description?: string;
}

export function Step({
  index,
  active,
  completed,
  last,
  label,
  description,
  className,
  ...props
}: StepProps) {
  return (
    <div
      className={cn(
        "flex flex-1 items-center z-10",
        last ? "flex-none" : "",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
            active ? "border-primary bg-primary text-white scale-110" : "",
            completed ? "border-green-500 bg-green-500 text-white" : "",
            !active && !completed
              ? "border-gray-300 bg-white text-gray-500"
              : ""
          )}
        >
          {completed ? (
            <CheckIcon className="h-5 w-5" />
          ) : index !== undefined ? (
            index + 1
          ) : null}
        </div>
        <div className="mt-2 text-center">
          <div
            className={cn(
              "text-sm font-medium transition-all duration-300",
              active ? "text-primary" : "",
              completed ? "text-green-500" : "",
              !active && !completed ? "text-gray-500" : ""
            )}
          >
            {label}
          </div>
          {description && (
            <div
              className={cn(
                "text-xs transition-all duration-300",
                active ? "text-primary" : "text-gray-500"
              )}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
