import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/contexts/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";

export const SettingsScreen = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getBgColorClass, getTextColorClass } = useThemeClasses();

  const settingsItems = [
    {
      id: 1,
      title: "Dark Mode",
      icon: "moon-outline",
      type: "switch",
      value: isDark,
      onPress: toggleTheme,
    },
    {
      id: 2,
      title: "Notifications",
      icon: "notifications-outline",
      type: "switch",
      value: true,
      onPress: () => {},
    },
    {
      id: 3,
      title: "Language",
      icon: "language-outline",
      type: "navigation",
      value: "English",
      onPress: () => {},
    },
    {
      id: 4,
      title: "Privacy Policy",
      icon: "shield-outline",
      type: "navigation",
      onPress: () => {},
    },
    {
      id: 5,
      title: "About",
      icon: "information-circle-outline",
      type: "navigation",
      onPress: () => {},
    },
  ];

  const renderSettingItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      onPress={item.onPress}
      className={cn(
        "flex-row items-center justify-between p-4 mb-2 rounded-xl",
        getBgColorClass("card")
      )}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-[#EC4899]/10 items-center justify-center mr-3">
          <Ionicons name={item.icon as any} size={20} color="#EC4899" />
        </View>
        <Text
          className={cn("text-base font-medium", getTextColorClass("text"))}
        >
          {item.title}
        </Text>
      </View>

      {item.type === "switch" ? (
        <Switch
          value={item.value}
          onValueChange={item.onPress}
          trackColor={{ false: "#D1D5DB", true: "#EC4899" }}
          thumbColor={item.value ? "#FFFFFF" : "#F3F4F6"}
        />
      ) : (
        <View className="flex-row items-center">
          {item.value && (
            <Text
              className={cn(
                "text-sm mr-2",
                getTextColorClass("text-secondary")
              )}
            >
              {item.value}
            </Text>
          )}
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className={cn("flex-1", getBgColorClass("background"))}>
      <ScrollView className="flex-1 px-6 pt-4">
        <Text
          className={cn("text-2xl font-bold mb-6", getTextColorClass("text"))}
        >
          Settings
        </Text>

        <View className="mb-6">
          <Text
            className={cn(
              "text-lg font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Preferences
          </Text>
          {settingsItems.map(renderSettingItem)}
        </View>

        <View className={cn("p-4 rounded-xl mb-6", getBgColorClass("card"))}>
          <View className="items-center">
            <View className="w-16 h-16 rounded-full bg-[#EC4899]/10 items-center justify-center mb-3">
              <Ionicons name="storefront" size={32} color="#EC4899" />
            </View>
            <Text
              className={cn("text-lg font-semibold", getTextColorClass("text"))}
            >
              ShopApp
            </Text>
            <Text
              className={cn(
                "text-sm mt-1",
                getTextColorClass("text-secondary")
              )}
            >
              Version 1.0.0
            </Text>
          </View>
        </View>

        <View className="items-center mt-4 mb-8">
          <Text className={cn("text-xs", getTextColorClass("text-secondary"))}>
            Made with ❤️ by Nhan Bernie
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
