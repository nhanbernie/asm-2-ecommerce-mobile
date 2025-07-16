import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import {
  Button,
  Card,
  Input,
  Avatar,
  Badge,
  Skeleton,
  Spinner,
  Divider,
  Chip,
  ThemeToggleSwitch,
} from "@/components/ui";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@/lib/utils";

const UIShowcase = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const [inputValue, setInputValue] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>(["chip1"]);

  const toggleChip = (chipId: string) => {
    setSelectedChips((prev) =>
      prev.includes(chipId)
        ? prev.filter((id) => id !== chipId)
        : [...prev, chipId]
    );
  };

  return (
    <ScrollView className={cn("flex-1", getBgColorClass("background"))}>
      <View className="p-6 gap-6">
        <Text
          className={cn(
            "text-3xl font-bold text-center",
            getTextColorClass("text")
          )}
        >
          UI Components Showcase
        </Text>

        <Card variant="elevated">
          <Text
            className={cn(
              "text-xl font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Theme Controls
          </Text>
          <ThemeToggleSwitch value={isDark} onValueChange={toggleTheme} />
        </Card>

        <Card variant="outlined">
          <Text
            className={cn(
              "text-lg font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Buttons
          </Text>
          <View className="gap-3">
            <Button
              title="Primary Button"
              icon={<Ionicons name="rocket" size={20} color="white" />}
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
            <Button title="Disabled Button" disabled />
          </View>
        </Card>

        <Card>
          <Text
            className={cn(
              "text-lg font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Inputs
          </Text>
          <View className="gap-4">
            <Input
              label="Default Input"
              placeholder="Enter text..."
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Input
              label="With Left Icon"
              placeholder="Search..."
              leftIcon={<Ionicons name="search" size={20} color="#8E8E93" />}
              variant="outlined"
            />
            <Input
              label="With Error"
              placeholder="Invalid input"
              error="This field is required"
              variant="filled"
            />
            <Input
              label="Large Size"
              placeholder="Large input..."
              size="lg"
              rightIcon={<Ionicons name="eye" size={20} color="#8E8E93" />}
            />
          </View>
        </Card>

        <Card variant="elevated">
          <Text
            className={cn(
              "text-lg font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Avatars
          </Text>
          <View className="flex-row gap-4 flex-wrap">
            <Avatar size="xs" fallback="XS" />
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
            <Avatar size="xl" fallback="XL" />
            <Avatar
              size="md"
              variant="rounded"
              src="https://ui-avatars.com/api/?name=John+Doe&size=200&background=007AFF&color=fff"
            />
            <Avatar size="md" variant="square" fallback="SQ" />
          </View>
        </Card>

        <Card>
          <Text
            className={cn(
              "text-lg font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Badges
          </Text>
          <View className="flex-row gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge size="lg">Large</Badge>
          </View>
        </Card>

        <Card variant="outlined">
          <Text
            className={cn(
              "text-lg font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Chips
          </Text>
          <View className="flex-row gap-2 flex-wrap">
            <Chip
              selected={selectedChips.includes("chip1")}
              onPress={() => toggleChip("chip1")}
            >
              Selectable
            </Chip>
            <Chip
              variant="outlined"
              leftIcon={<Ionicons name="star" size={16} color="#007AFF" />}
            >
              With Icon
            </Chip>
            <Chip variant="soft" onDelete={() => console.log("Delete chip")}>
              Deletable
            </Chip>
            <Chip size="lg">Large Chip</Chip>
          </View>
        </Card>

        <Card>
          <Text
            className={cn(
              "text-lg font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Loading States
          </Text>
          <View className="gap-4">
            <View className="flex-row items-center gap-4">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner color="secondary" />
            </View>

            <Divider label="Skeletons" />

            <View className="gap-2">
              <Skeleton variant="text" width={200} />
              <Skeleton variant="text" width={150} />
              <View className="flex-row items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <View className="flex-1 gap-2">
                  <Skeleton variant="text" width={120} />
                  <Skeleton variant="text" width={80} />
                </View>
              </View>
              <Skeleton variant="rectangular" width={300} height={100} />
            </View>
          </View>
        </Card>

        <Card variant="elevated">
          <Text
            className={cn(
              "text-lg font-semibold mb-4",
              getTextColorClass("text")
            )}
          >
            Dividers
          </Text>
          <Text className={cn("text-sm", getTextColorClass("text-secondary"))}>
            Content above divider
          </Text>
          <Divider />
          <Text className={cn("text-sm", getTextColorClass("text-secondary"))}>
            Content below divider
          </Text>
          <Divider label="With Label" />
          <Text className={cn("text-sm", getTextColorClass("text-secondary"))}>
            Content after labeled divider
          </Text>
          <Divider variant="dashed" />
          <Text className={cn("text-sm", getTextColorClass("text-secondary"))}>
            Content after dashed divider
          </Text>
        </Card>

        <View className="h-6" />
      </View>
    </ScrollView>
  );
};

export default UIShowcase;
