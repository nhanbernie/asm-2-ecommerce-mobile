import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React from "react";
import { Text, View, ViewProps } from "react-native";

interface BadgeProps extends ViewProps {
  variant?: "default" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
}

export const Badge = ({
  variant = "default",
  size = "md",
  children,
  className,
  ...props
}: BadgeProps) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs";
      case "lg":
        return "px-4 py-2 text-base";
      default:
        return "px-3 py-1.5 text-sm";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return cn(getBgColorClass("surface"), getTextColorClass("text"));
      case "success":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "error":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      case "info":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      default:
        return cn(getBgColorClass("primary"), "text-white");
    }
  };

  return (
    <View
      className={cn(
        "rounded-full items-center justify-center",
        getSizeClasses(),
        getVariantClasses(),
        className
      )}
      {...props}
    >
      <Text className="font-semibold">{children}</Text>
    </View>
  );
};
