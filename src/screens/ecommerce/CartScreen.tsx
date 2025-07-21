import { RootStackParamList } from "@/common/types/rootParamList";
import { Button } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import { CartItemCard } from "@/screens/ecommerce/components/CartItemCard";
import { PriceSummary } from "@/screens/ecommerce/components/PriceSummary";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type CartScreenProps = NativeStackScreenProps<RootStackParamList, "Cart">;

export const CartScreen = ({ navigation }: CartScreenProps) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const { items, totalItems, clearCart } = useCart();

  const handleCheckout = () => {
    Alert.alert(
      "Checkout",
      "Thank you for your order! This would normally redirect to payment processing.",
      [
        {
          text: "Continue Shopping",
          onPress: () => navigation.navigate("ProductList"),
          style: "default",
        },
        {
          text: "Clear Cart",
          onPress: () => {
            clearCart();
            navigation.navigate("ProductList");
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: clearCart,
          style: "destructive",
        },
      ]
    );
  };

  const renderEmptyCart = () => (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-6">
        <Ionicons name="cart-outline" size={64} color="#9CA3AF" />
      </View>

      <Text
        className={cn(
          "text-2xl font-bold mb-2 text-center",
          getTextColorClass("text")
        )}
      >
        Your cart is empty
      </Text>

      <Text
        className={cn(
          "text-center mb-8 leading-6",
          getTextColorClass("text-secondary")
        )}
      >
        Looks like you haven't added anything to your cart yet. Start shopping
        to fill it up!
      </Text>

      <Button
        title="Start Shopping"
        onPress={() => navigation.navigate("ProductList")}
        className="w-full bg-[#EC4899]"
      />
    </View>
  );

  const renderHeader = () => (
    <View className="flex-row items-center justify-between mb-6">
      <View>
        <Text className={cn("text-2xl font-bold", getTextColorClass("text"))}>
          Shopping Cart
        </Text>
        <Text
          className={cn("text-base mt-1", getTextColorClass("text-secondary"))}
        >
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </Text>
      </View>

      {totalItems > 0 && (
        <TouchableOpacity
          onPress={handleClearCart}
          className="flex-row items-center px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20"
        >
          <Ionicons name="trash-outline" size={16} color="#EF4444" />
          <Text className="text-red-500 dark:text-red-400 text-sm font-medium ml-1">
            Clear
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView className={cn("flex-1", getBgColorClass("background"))}>
        <View className="flex-1 px-6 pt-4">
          {renderHeader()}
          {renderEmptyCart()}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={cn("flex-1", getBgColorClass("background"))}
      edges={["top"]}
    >
      <View className="flex-1">
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View className="px-6">
              <CartItemCard item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={
            <View className="px-6 pt-4">{renderHeader()}</View>
          }
          ItemSeparatorComponent={() => (
            <View className="px-6">
              <View className="h-0" />
            </View>
          )}
          ListFooterComponent={
            <View className="px-6 mt-6">
              <PriceSummary
                onCheckout={handleCheckout}
                showCheckoutButton={true}
              />

              <View className="mt-4 mb-2">
                <Button
                  title="Continue Shopping"
                  onPress={() => navigation.navigate("ProductList")}
                  className="bg-gray-200 dark:bg-gray-700"
                  textClassName="text-[#EC4899]"
                />
              </View>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};
