import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { Animated, View, ViewProps } from "react-native";

interface SpinnerProps extends ViewProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white";
  className?: string;
}

export const Spinner = ({
  size = "md",
  color = "primary",
  className,
  ...props
}: SpinnerProps) => {
  const { getTextColorClass } = useThemeClasses();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();
    return () => spinAnimation.stop();
  }, [spinValue]);

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4 border-2";
      case "lg":
        return "w-8 h-8 border-4";
      default:
        return "w-6 h-6 border-2";
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "secondary":
        return "border-text-secondary-light dark:border-text-secondary-dark";
      case "white":
        return "border-white";
      default:
        return "border-[#EC4899]";
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      className={cn(
        "rounded-full border-t-transparent",
        getSizeClasses(),
        getColorClasses(),
        className
      )}
      style={{ transform: [{ rotate: spin }] }}
      {...props}
    />
  );
};
