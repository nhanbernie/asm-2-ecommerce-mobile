import { Button, Divider } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import React from "react";
import { Text, View } from "react-native";

interface PriceSummaryProps {
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
}

export const PriceSummary = ({
  onCheckout,
  showCheckoutButton = true,
}: PriceSummaryProps) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const { totalItems, totalPrice } = useCart();

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  return (
    <View className={cn("p-6 rounded-3xl shadow-lg", getBgColorClass("card"))}>
      <Text className={cn("text-xl font-bold mb-4", getTextColorClass("text"))}>
        Order Summary
      </Text>

      <View className="gap-3">
        <View className="flex-row justify-between items-center">
          <Text
            className={cn("text-base", getTextColorClass("text-secondary"))}
          >
            Items ({totalItems})
          </Text>
          <Text
            className={cn("text-base font-semibold", getTextColorClass("text"))}
          >
            ${totalPrice.toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text
            className={cn("text-base", getTextColorClass("text-secondary"))}
          >
            Shipping
          </Text>
          <Text
            className={cn("text-base font-semibold", getTextColorClass("text"))}
          >
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text
            className={cn("text-base", getTextColorClass("text-secondary"))}
          >
            Tax
          </Text>
          <Text
            className={cn("text-base font-semibold", getTextColorClass("text"))}
          >
            ${tax.toFixed(2)}
          </Text>
        </View>

        <Divider />

        <View className="flex-row justify-between items-center">
          <Text className={cn("text-lg font-bold", getTextColorClass("text"))}>
            Total
          </Text>
          <Text className={cn("text-xl font-bold", getTextColorClass("text"))}>
            ${finalTotal.toFixed(2)}
          </Text>
        </View>
      </View>

      {totalPrice > 100 && (
        <View className="mt-3 p-3 rounded-xl bg-green-100 dark:bg-green-900">
          <Text className="text-green-800 dark:text-green-200 text-sm font-medium text-center">
            Free shipping on orders over $100!
          </Text>
        </View>
      )}

      {showCheckoutButton && totalItems > 0 && (
        <Button
          title={`Checkout ($${finalTotal.toFixed(2)})`}
          onPress={onCheckout}
          className="mt-6"
        />
      )}
    </View>
  );
};
