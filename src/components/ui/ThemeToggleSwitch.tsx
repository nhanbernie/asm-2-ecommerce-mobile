import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface ThemeToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ThemeToggleSwitch = ({
  value,
  onValueChange,
}: ThemeToggleSwitchProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.labelContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Ionicons
            name={value ? "moon" : "sunny"}
            size={20}
            color={colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.label, { color: colors.text }]}>
            {value ? "Dark Mode" : "Light Mode"}
          </Text>
        </View>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    marginVertical: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
