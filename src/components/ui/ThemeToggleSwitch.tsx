import { useTheme } from "@/contexts/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Switch, Text, View } from "react-native";

interface ThemeToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ThemeToggleSwitch = ({
  value,
  onValueChange,
}: ThemeToggleSwitchProps) => {
  const { colors } = useTheme();
  const { getBgColorClass, getTextColorClass, getBorderColorClass } =
    useThemeClasses();

  return (
    <View
      className={`flex-row items-center justify-between p-5 rounded-2xl border-2 my-3 shadow-md ${getBgColorClass(
        "card"
      )} ${getBorderColorClass()}`}
    >
      <View className="flex-1">
        <View className="flex-row items-center mb-2">
          <Ionicons
            name={value ? "moon" : "sunny"}
            size={20}
            color={colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text
            className={`text-lg font-semibold tracking-wide ${getTextColorClass(
              "text"
            )}`}
          >
            {value ? "Dark Mode" : "Light Mode"}
          </Text>
        </View>
        <Text
          className={`text-sm leading-5 ${getTextColorClass("text-secondary")}`}
        >
          Switch between light and dark theme
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor={colors.border}
      />
    </View>
  );
};
