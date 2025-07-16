import { cn } from "@/lib/utils";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import React from "react";

export const useThemedStyles = () => {
  const { getBgColorClass, getTextColorClass, getBorderColorClass } =
    useThemeClasses();

  const containerStyle = cn("flex-1", getBgColorClass("background"));
  const cardStyle = cn("p-4 rounded-2xl shadow-lg", getBgColorClass("card"));
  const textStyle = cn("text-base", getTextColorClass("text"));
  const headingStyle = cn("text-xl font-bold", getTextColorClass("text"));
  const subtitleStyle = cn("text-sm", getTextColorClass("text-secondary"));
  const borderStyle = cn("border", getBorderColorClass());

  return {
    containerStyle,
    cardStyle,
    textStyle,
    headingStyle,
    subtitleStyle,
    borderStyle,
  };
};

export const themeVariants = {
  button: {
    primary: "bg-primary-light dark:bg-primary-dark text-white",
    secondary:
      "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark",
    outline:
      "bg-transparent border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark",
  },
  card: {
    elevated: "bg-card-light dark:bg-card-dark shadow-lg elevation-8",
    outlined:
      "bg-card-light dark:bg-card-dark border-2 border-border-light dark:border-border-dark",
    flat: "bg-card-light dark:bg-card-dark",
  },
  text: {
    primary: "text-text-light dark:text-text-dark",
    secondary: "text-text-secondary-light dark:text-text-secondary-dark",
    accent: "text-primary-light dark:text-primary-dark",
  },
} as const;
