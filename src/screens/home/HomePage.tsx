import { RootStackParamList } from "@/common/types/rootParamList";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { homePageStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
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
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[homePageStyles.container, { backgroundColor: colors.background }]}
    >
      <View style={homePageStyles.content}>
        <View style={homePageStyles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Ionicons
              name="hand-right"
              size={24}
              color={colors.textSecondary}
              style={{ marginRight: 8 }}
            />
            <Text
              style={[homePageStyles.greeting, { color: colors.textSecondary }]}
            >
              Welcome back
            </Text>
          </View>
          <Text style={[homePageStyles.title, { color: colors.text }]}></Text>
        </View>
        <View
          style={[
            homePageStyles.heroCard,
            { backgroundColor: colors.card, shadowColor: colors.text },
          ]}
        >
          <Ionicons
            name="rocket"
            size={32}
            color={colors.primary}
            style={{ marginBottom: 12 }}
          />
          <Text style={[homePageStyles.heroTitle, { color: colors.text }]}>
            Ready to explore?
          </Text>
          <Text
            style={[
              homePageStyles.heroSubtitle,
              { color: colors.textSecondary },
            ]}
          >
            Manage your profile and customize your experience
          </Text>
        </View>
        <View style={homePageStyles.buttonContainer}>
          <Button
            title="View Profile"
            icon={<Ionicons name="person" size={20} color="#FFFFFF" />}
            style={homePageStyles.button}
          />
          <Button
            title="Settings"
            variant="secondary"
            icon={
              <Ionicons
                name="settings"
                size={20}
                color={colors.textSecondary}
              />
            }
            style={homePageStyles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
