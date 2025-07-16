import { useCart } from "@/contexts/CartContext";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import { CartItem } from "@/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const { updateQuantity, removeItem } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <View
      className={cn(
        "flex-row p-4 mb-3 rounded-2xl shadow-sm",
        getBgColorClass("card")
      )}
    >
      <Image
        source={{ uri: item.thumbnail }}
        className="w-20 h-20 rounded-xl"
        resizeMode="cover"
      />

      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text
            className={cn(
              "text-base font-semibold flex-1 mr-2",
              getTextColorClass("text")
            )}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <TouchableOpacity
            onPress={handleRemove}
            className="p-1"
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <Text
          className={cn("text-lg font-bold mb-2", getTextColorClass("text"))}
        >
          ${item.price}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={handleDecrease}
              className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 items-center justify-center"
            >
              <Ionicons name="remove" size={16} color="#EC4899" />
            </TouchableOpacity>

            <Text
              className={cn(
                "mx-4 text-base font-semibold min-w-[30px] text-center",
                getTextColorClass("text")
              )}
            >
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={handleIncrease}
              className="w-8 h-8 rounded-full bg-pink-400 items-center justify-center"
            >
              <Ionicons name="add" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <Text className={cn("text-lg font-bold", getTextColorClass("text"))}>
            ${itemTotal.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
