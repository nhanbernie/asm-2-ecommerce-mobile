import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";

interface ChipProps extends TouchableOpacityProps {
  variant?: "filled" | "outlined" | "soft";
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  onDelete?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const Chip = ({
  variant = "filled",
  size = "md",
  selected = false,
  onDelete,
  leftIcon,
  rightIcon,
  deleteIcon,
  children,
  className,
  onPress,
  ...props
}: ChipProps) => {
  const { getBgColorClass, getTextColorClass, getBorderColorClass } =
    useThemeClasses();

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
    if (selected) {
      return cn(getBgColorClass("primary"), "text-white");
    }

    switch (variant) {
      case "outlined":
        return cn(
          "bg-transparent border",
          getBorderColorClass(),
          getTextColorClass("text")
        );
      case "soft":
        return cn(getBgColorClass("surface"), getTextColorClass("text"));
      default:
        return cn(getBgColorClass("card"), getTextColorClass("text"));
    }
  };

  const content = (
    <View className="flex-row items-center">
      {leftIcon && <View className="mr-1">{leftIcon}</View>}

      <Text className="font-medium">{children}</Text>

      {rightIcon && !deleteIcon && <View className="ml-1">{rightIcon}</View>}

      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          className="ml-1 p-0.5"
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        >
          {deleteIcon || <Text className="text-current">×</Text>}
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        className={cn(
          "rounded-full items-center justify-center",
          getSizeClasses(),
          getVariantClasses(),
          className
        )}
        onPress={onPress}
        {...props}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={cn(
        "rounded-full items-center justify-center",
        getSizeClasses(),
        getVariantClasses(),
        className
      )}
    >
      {content}
    </View>
  );
};
