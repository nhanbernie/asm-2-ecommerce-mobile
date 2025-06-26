import { useTheme } from "@/contexts/ThemeContext";
import { buttonStyles } from "@/styles";
import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: undefined | React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
  disabled = false,
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled ? colors.textSecondary : colors.primary,
        };
      case "secondary":
        return {
          backgroundColor: colors.surface,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.primary,
        };
      default:
        return {
          backgroundColor: colors.primary,
        };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return {
          color: "#FFFFFF",
        };
      case "secondary":
        return {
          color: colors.text,
        };
      case "outline":
        return {
          color: colors.primary,
        };
      default:
        return {
          color: "#FFFFFF",
        };
    }
  };
  return (
    <TouchableOpacity
      style={[buttonStyles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={buttonStyles.buttonContent}>
        {icon && iconPosition === "left" && (
          <View style={buttonStyles.iconContainer}>{icon}</View>
        )}

        <Text style={[buttonStyles.buttonText, getTextStyle(), textStyle]}>
          {String(title || "")}
        </Text>

        {icon && iconPosition === "right" && (
          <View style={buttonStyles.iconContainer}>{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};
