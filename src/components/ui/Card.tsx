import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  variant?: "default" | "elevated" | "outlined";
  className?: string;
  children?: React.ReactNode;
}

export const Card = ({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) => {
  const { getBgColorClass, getBorderColorClass } = useThemeClasses();

  const getCardClasses = () => {
    const baseClasses = "rounded-2xl p-4";

    switch (variant) {
      case "elevated":
        return cn(
          baseClasses,
          getBgColorClass("card"),
          "shadow-lg shadow-black/10 elevation-8"
        );
      case "outlined":
        return cn(
          baseClasses,
          getBgColorClass("card"),
          "border-2",
          getBorderColorClass()
        );
      default:
        return cn(baseClasses, getBgColorClass("card"));
    }
  };

  return (
    <View className={cn(getCardClasses(), className)} {...props}>
      {children}
    </View>
  );
};
