import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { Animated, View, ViewProps } from "react-native";

interface SkeletonProps extends ViewProps {
  variant?: "text" | "circular" | "rectangular";
  width?: number;
  height?: number;
  className?: string;
  animate?: boolean;
}

export const Skeleton = ({
  variant = "rectangular",
  width,
  height,
  className,
  animate = true,
  style,
  ...props
}: SkeletonProps) => {
  const { getBgColorClass } = useThemeClasses();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [animate, animatedValue]);

  const getVariantClasses = () => {
    switch (variant) {
      case "text":
        return "rounded-md h-4";
      case "circular":
        return "rounded-full";
      default:
        return "rounded-lg";
    }
  };

  const getDefaultSize = () => {
    if (variant === "text") return { width: 200, height: 16 };
    if (variant === "circular") return { width: 40, height: 40 };
    return { width: 40, height: 40 };
  };

  const defaultSize = getDefaultSize();

  const animatedStyle = animate
    ? {
        opacity: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 0.7],
        }),
      }
    : {};

  return (
    <Animated.View
      className={cn(getBgColorClass("surface"), getVariantClasses(), className)}
      style={[
        {
          width: width || defaultSize.width,
          height: height || defaultSize.height,
        },
        animatedStyle,
        style,
      ]}
      {...props}
    />
  );
};
