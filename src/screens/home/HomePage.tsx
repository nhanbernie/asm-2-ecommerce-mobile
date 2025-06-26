import { RootStackParamList } from "@/common/types/rootParamList";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReduxExample from "@/components/examples/ReduxExample";
import NativeWindDemo from "@/components/examples/NativeWindDemo";
import { Button } from "@/components/ui/Button";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomePage = ({ navigation }: Props) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const [activeDemo, setActiveDemo] = useState<"redux" | "nativewind">(
    "nativewind"
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

        <View className="flex-row gap-2 mb-4">
          <Button
            title="NativeWind"
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

      {activeDemo === "redux" ? <ReduxExample /> : <NativeWindDemo />}
    </SafeAreaView>
  );
};

export default HomePage;
