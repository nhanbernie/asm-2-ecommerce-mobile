import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React from "react";
import { Image, Text, View, ViewProps } from "react-native";

interface AvatarProps extends ViewProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "circular" | "rounded" | "square";
  fallback?: string;
  className?: string;
}

export const Avatar = ({
  src,
  alt,
  size = "md",
  variant = "circular",
  fallback,
  className,
  ...props
}: AvatarProps) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();

  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return "w-6 h-6";
      case "sm":
        return "w-8 h-8";
      case "lg":
        return "w-16 h-16";
      case "xl":
        return "w-20 h-20";
      case "2xl":
        return "w-24 h-24";
      default:
        return "w-12 h-12";
    }
  };

  const getTextSizeClasses = () => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "lg":
        return "text-xl";
      case "xl":
        return "text-2xl";
      case "2xl":
        return "text-3xl";
      default:
        return "text-base";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "rounded":
        return "rounded-xl";
      case "square":
        return "rounded-none";
      default:
        return "rounded-full";
    }
  };

  const containerClasses = cn(
    getSizeClasses(),
    getVariantClasses(),
    "items-center justify-center overflow-hidden",
    getBgColorClass("surface"),
    className
  );

  if (src) {
    return (
      <View className={containerClasses} {...props}>
        <Image
          source={{ uri: src }}
          alt={alt}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View className={containerClasses} {...props}>
      <Text
        className={cn(
          getTextSizeClasses(),
          "font-semibold",
          getTextColorClass("text")
        )}
      >
        {fallback || alt?.charAt(0)?.toUpperCase() || "?"}
      </Text>
    </View>
  );
};
