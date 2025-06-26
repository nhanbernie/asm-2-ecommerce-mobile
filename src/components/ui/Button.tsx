import { useThemeClasses } from "@/hooks/useThemeClasses";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
  icon?: undefined | React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  className = "",
  disabled = false,
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  const { getBgColorClass, getTextColorClass, getBorderColorClass } =
    useThemeClasses();

  const getButtonClasses = () => {
    const baseClasses =
      "px-6 py-4 rounded-2xl items-center justify-center min-h-[56px] shadow-lg";

    switch (variant) {
      case "primary":
        return `${baseClasses} ${
          disabled
            ? "bg-text-secondary-light dark:bg-text-secondary-dark"
            : getBgColorClass("primary")
        }`;
      case "secondary":
        return `${baseClasses} ${getBgColorClass("surface")}`;
      case "outline":
        return `${baseClasses} bg-transparent border-2 ${getBorderColorClass()}`;
      default:
        return `${baseClasses} ${getBgColorClass("primary")}`;
    }
  };

  const getTextClasses = () => {
    const baseClasses = "text-base font-semibold tracking-wide";

    switch (variant) {
      case "primary":
        return `${baseClasses} text-white`;
      case "secondary":
        return `${baseClasses} ${getTextColorClass("text")}`;
      case "outline":
        return `${baseClasses} ${getTextColorClass("primary")}`;
      default:
        return `${baseClasses} text-white`;
    }
  };

  return (
    <TouchableOpacity
      className={`${getButtonClasses()} ${className}`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center">
        {icon && iconPosition === "left" && (
          <View className="mx-2">{icon}</View>
        )}

        <Text className={getTextClasses()}>{String(title || "")}</Text>

        {icon && iconPosition === "right" && (
          <View className="mx-2">{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};
