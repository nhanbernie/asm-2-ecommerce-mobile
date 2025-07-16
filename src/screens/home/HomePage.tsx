import { RootStackParamList } from "@/common/types/rootParamList";
import NativeWindDemo from "@/components/examples/NativeWindDemo";
import ReduxExample from "@/components/examples/ReduxExample";
import UIShowcase from "@/components/examples/UIShowcase";
import { Button } from "@/components/ui/Button";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomePage = ({ navigation }: Props) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const [activeDemo, setActiveDemo] = useState<"redux" | "nativewind" | "ui">(
    "ui"
  );

  return (
    <SafeAreaView className={`flex-1 ${getBgColorClass("background")}`}>
      <View className="p-4">
        <Text
          className={`text-2xl font-bold text-center mb-4 ${getTextColorClass(
            "text"
          )}`}
        >
          Demo Showcase
        </Text>

        {/* E-Commerce App Button */}
        <Button
          title="Open E-Commerce App"
          onPress={() => navigation.navigate("ProductList")}
          className="mb-4"
          icon={<Ionicons name="storefront" size={20} color="#FFFFFF" />}
        />

        <View className="flex-row gap-2 mb-4">
          <Button
            title="UI"
            variant={activeDemo === "ui" ? "primary" : "outline"}
            onPress={() => setActiveDemo("ui")}
            className="flex-1"
            icon={
              <Ionicons
                name="apps"
                size={16}
                color={activeDemo === "ui" ? "#FFFFFF" : "#007AFF"}
              />
            }
          />
          <Button
            title="Theme"
            variant={activeDemo === "nativewind" ? "primary" : "outline"}
            onPress={() => setActiveDemo("nativewind")}
            className="flex-1"
            icon={
              <Ionicons
                name="color-palette"
                size={16}
                color={activeDemo === "nativewind" ? "#FFFFFF" : "#007AFF"}
              />
            }
          />
          <Button
            title="Redux"
            variant={activeDemo === "redux" ? "primary" : "outline"}
            onPress={() => setActiveDemo("redux")}
            className="flex-1"
            icon={
              <Ionicons
                name="layers"
                size={16}
                color={activeDemo === "redux" ? "#FFFFFF" : "#007AFF"}
              />
            }
          />
        </View>
      </View>

      {activeDemo === "redux" ? (
        <ReduxExample />
      ) : activeDemo === "nativewind" ? (
        <NativeWindDemo />
      ) : (
        <UIShowcase />
      )}
    </SafeAreaView>
  );
};

export default HomePage;
