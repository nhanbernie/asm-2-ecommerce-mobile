import { useTheme } from "@/contexts/ThemeContext";

export const useThemeClasses = () => {
  const { isDark } = useTheme();

  const getThemeClass = (lightClass: string, darkClass: string) => {
    return isDark ? darkClass : lightClass;
  };

  const getColorClass = (
    type:
      | "primary"
      | "background"
      | "surface"
      | "text"
      | "text-secondary"
      | "border"
      | "card"
  ) => {
    const colorMap = {
      primary: getThemeClass("text-primary-light", "text-primary-dark"),
      background: getThemeClass("bg-background-light", "bg-background-dark"),
      surface: getThemeClass("bg-surface-light", "bg-surface-dark"),
      text: getThemeClass("text-text-light", "text-text-dark"),
      "text-secondary": getThemeClass(
        "text-text-secondary-light",
        "text-text-secondary-dark"
      ),
      border: getThemeClass("border-border-light", "border-border-dark"),
      card: getThemeClass("bg-card-light", "bg-card-dark"),
    };

    return colorMap[type];
  };

  const getBgColorClass = (
    type: "primary" | "background" | "surface" | "card"
  ) => {
    const colorMap = {
      primary: getThemeClass("bg-primary-light", "bg-primary-dark"),
      background: getThemeClass("bg-background-light", "bg-background-dark"),
      surface: getThemeClass("bg-surface-light", "bg-surface-dark"),
      card: getThemeClass("bg-card-light", "bg-card-dark"),
    };

    return colorMap[type];
  };

  const getTextColorClass = (type: "primary" | "text" | "text-secondary") => {
    const colorMap = {
      primary: getThemeClass("text-primary-light", "text-primary-dark"),
      text: getThemeClass("text-text-light", "text-text-dark"),
      "text-secondary": getThemeClass(
        "text-text-secondary-light",
        "text-text-secondary-dark"
      ),
    };

    return colorMap[type];
  };

  const getBorderColorClass = () => {
    return getThemeClass("border-border-light", "border-border-dark");
  };

  return {
    isDark,
    getThemeClass,
    getColorClass,
    getBgColorClass,
    getTextColorClass,
    getBorderColorClass,
  };
};
