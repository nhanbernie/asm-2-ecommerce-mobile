import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductListScreen } from "@/screens/ecommerce/ProductListScreen";
import { WishlistScreen } from "@/screens/ecommerce/WishlistScreen";
import { CartScreen } from "@/screens/ecommerce/CartScreen";
import { SettingsScreen } from "@/screens/settings/SettingsScreen";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { TabParamList } from "@/common/types/rootParamList";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="ProductList"
      >
        <Tab.Screen name="ProductList" component={ProductListScreen} />
        <Tab.Screen name="Wishlist" component={WishlistScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
};
