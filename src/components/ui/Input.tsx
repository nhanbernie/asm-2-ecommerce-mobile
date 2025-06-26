import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "default",
      size = "md",
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const { getBgColorClass, getTextColorClass, getBorderColorClass } =
      useThemeClasses();

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "px-3 py-2 text-sm min-h-[40px]";
        case "lg":
          return "px-6 py-4 text-lg min-h-[64px]";
        default:
          return "px-4 py-3 text-base min-h-[56px]";
      }
    };

    const getInputClasses = () => {
      const baseClasses = cn(
        "rounded-2xl font-medium",
        getSizeClasses(),
        getTextColorClass("text")
      );

      switch (variant) {
        case "filled":
          return cn(baseClasses, getBgColorClass("surface"));
        case "outlined":
          return cn(
            baseClasses,
            getBgColorClass("card"),
            "border-2",
            error ? "border-red-500" : getBorderColorClass()
          );
        default:
          return cn(
            baseClasses,
            getBgColorClass("surface"),
            "border-2",
            error ? "border-red-500" : "border-transparent"
          );
      }
    };

    return (
      <View className={cn("mb-4", containerClassName)}>
        {label && (
          <Text
            className={cn(
              "text-base font-semibold mb-2 tracking-wide",
              getTextColorClass("text")
            )}
          >
            {label}
          </Text>
        )}

        <View className="relative">
          {leftIcon && (
            <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              {leftIcon}
            </View>
          )}

          <TextInput
            ref={ref}
            className={cn(
              getInputClasses(),
              leftIcon && "pl-12",
              rightIcon && "pr-12",
              className
            )}
            placeholderTextColor="#8E8E93"
            {...props}
          />

          {rightIcon && (
            <View className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              {rightIcon}
            </View>
          )}
        </View>

        {(error || helperText) && (
          <Text
            className={cn(
              "text-sm mt-2 font-medium",
              error ? "text-red-500" : getTextColorClass("text-secondary")
            )}
          >
            {error || helperText}
          </Text>
        )}
      </View>
    );
  }
);
