import { useTheme } from "@/contexts/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { ThemeToggleSwitch } from "@/components/ui/ThemeToggleSwitch";
import { Button } from "@/components/ui/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View, Text, ScrollView } from "react-native";

const NativeWindDemo = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getBgColorClass, getTextColorClass } = useThemeClasses();

  return (
    <ScrollView className={`flex-1 ${getBgColorClass("background")}`}>
      <View className="p-6">
        <Text
          className={`text-3xl font-bold text-center mb-6 ${getTextColorClass(
            "text"
          )}`}
        >
          NativeWind + Theme Demo
        </Text>

        <View
          className={`p-6 rounded-3xl mb-6 shadow-lg ${getBgColorClass(
            "card"
          )}`}
        >
          <View className="flex-row items-center mb-4">
            <Ionicons name="color-palette" size={24} color="#007AFF" />
            <Text
              className={`text-xl font-semibold ml-3 ${getTextColorClass(
                "text"
              )}`}
            >
              Theme Controls
            </Text>
          </View>

          <ThemeToggleSwitch value={isDark} onValueChange={toggleTheme} />
        </View>

        <View
          className={`p-6 rounded-3xl mb-6 shadow-lg ${getBgColorClass(
            "card"
          )}`}
        >
          <Text
            className={`text-lg font-semibold mb-4 ${getTextColorClass(
              "text"
            )}`}
          >
            Button Variants
          </Text>

          <View className="gap-3">
            <Button
              title="Primary Button"
              icon={<Ionicons name="rocket" size={20} color="#FFFFFF" />}
            />

            <Button
              title="Secondary Button"
              variant="secondary"
              icon={<Ionicons name="settings" size={20} color="#8E8E93" />}
            />

            <Button
              title="Outline Button"
              variant="outline"
              icon={<Ionicons name="heart" size={20} color="#007AFF" />}
            />
          </View>
        </View>

        <View
          className={`p-6 rounded-3xl mb-6 shadow-lg ${getBgColorClass(
            "surface"
          )}`}
        >
          <Text
            className={`text-lg font-semibold mb-3 ${getTextColorClass(
              "text"
            )}`}
          >
            Typography Showcase
          </Text>

          <Text className={`text-base mb-2 ${getTextColorClass("text")}`}>
            This is primary text color
          </Text>

          <Text className={`text-sm ${getTextColorClass("text-secondary")}`}>
            This is secondary text color for descriptions and less important
            information.
          </Text>
        </View>

        <View
          className={`p-6 rounded-2xl border-2 ${getBgColorClass(
            "surface"
          )} border-border-light dark:border-border-dark`}
        >
          <Text
            className={`text-center font-medium ${getTextColorClass(
              "text-secondary"
            )}`}
          >
            Current theme: {isDark ? "Dark" : "Light"} Mode
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NativeWindDemo;
