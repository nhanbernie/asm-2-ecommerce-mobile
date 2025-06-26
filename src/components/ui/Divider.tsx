import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React from "react";
import { Text, View, ViewProps } from "react-native";

interface DividerProps extends ViewProps {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed";
  label?: string;
  className?: string;
}

export const Divider = ({
  orientation = "horizontal",
  variant = "solid",
  label,
  className,
  ...props
}: DividerProps) => {
  const { getBorderColorClass, getTextColorClass } = useThemeClasses();

  const getOrientationClasses = () => {
    if (orientation === "vertical") {
      return "w-px h-full";
    }
    return "h-px w-full";
  };

  const getVariantClasses = () => {
    const borderColor = getBorderColorClass();
    if (variant === "dashed") {
      return `border-dashed border-t ${borderColor}`;
    }
    return `bg-border-light dark:bg-border-dark`;
  };

  if (label && orientation === "horizontal") {
    return (
      <View className={cn("flex-row items-center my-4", className)} {...props}>
        <View className={cn("flex-1", getVariantClasses())} />
        <Text
          className={cn(
            "px-4 text-sm font-medium",
            getTextColorClass("text-secondary")
          )}
        >
          {label}
        </Text>
        <View className={cn("flex-1", getVariantClasses())} />
      </View>
    );
  }

  return (
    <View
      className={cn(
        getOrientationClasses(),
        getVariantClasses(),
        orientation === "horizontal" ? "my-4" : "mx-4",
        className
      )}
      {...props}
    />
  );
};
