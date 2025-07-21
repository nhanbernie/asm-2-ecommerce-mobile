import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface TabIconProps {
  name: string;
  focused: boolean;
  badgeCount?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, badgeCount }) => {
  const iconSize = 24;
  const iconColor = focused ? "#EC4899" : "#9CA3AF";

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Ionicons name={name as any} size={iconSize} color={iconColor} />
      {badgeCount && badgeCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            backgroundColor: "#EF4444",
            borderRadius: 9,
            minWidth: 18,
            height: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            {badgeCount > 99 ? "99+" : badgeCount.toString()}
          </Text>
        </View>
      )}
    </View>
  );
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const tabConfig = [
    { key: "ProductList", icon: "grid-outline", activeIcon: "grid" },
    {
      key: "Wishlist",
      icon: "heart-outline",
      activeIcon: "heart",
      badge: wishlistItems.length,
    },
    {
      key: "Cart",
      icon: "bag-outline",
      activeIcon: "bag",
      badge: cartItems.length,
    },
    { key: "Settings", icon: "settings-outline", activeIcon: "settings" },
  ];

  const getTabConfig = (routeName: string) => {
    return tabConfig.find((tab) => tab.key === routeName) || tabConfig[0];
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingTop: 8,
        paddingBottom: insets.bottom + 8,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabInfo = getTabConfig(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
            }}
          >
            <TabIcon
              name={
                isFocused ? tabInfo.activeIcon || tabInfo.icon : tabInfo.icon
              }
              focused={isFocused}
              badgeCount={tabInfo.badge}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
