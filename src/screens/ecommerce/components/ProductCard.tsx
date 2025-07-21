import { Badge } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import { Product } from "@/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  variant?: "grid" | "list";
}

export const ProductCard = ({
  product,
  onPress,
  variant = "grid",
}: ProductCardProps) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const { addItem, isInCart, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlistToggle = (e: any) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);
  const inWishlist = isInWishlist(product.id);

  if (variant === "list") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={cn(
          "flex-row p-4 mb-3 rounded-2xl shadow-sm",
          getBgColorClass("card")
        )}
      >
        <Image
          source={{ uri: product.thumbnail }}
          className="w-20 h-20 rounded-xl"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4">
          <Text
            className={cn(
              "text-base font-semibold mb-1",
              getTextColorClass("text")
            )}
            numberOfLines={2}
          >
            {product.title}
          </Text>

          <Text
            className={cn("text-sm mb-2", getTextColorClass("text-secondary"))}
            numberOfLines={1}
          >
            {product.category}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text
              className={cn("text-lg font-bold", getTextColorClass("text"))}
            >
              ${product.price}
            </Text>

            {inCart && (
              <Badge variant="success" size="sm">
                {quantity} in cart
              </Badge>
            )}
          </View>
        </View>

        <View className="flex-row">
          <TouchableOpacity
            onPress={handleWishlistToggle}
            className={cn(
              "w-10 h-10 rounded-full items-center justify-center mr-2",
              inWishlist ? "bg-red-500" : "bg-gray-100 dark:bg-gray-800"
            )}
          >
            <Ionicons
              name={inWishlist ? "heart" : "heart-outline"}
              size={18}
              color={inWishlist ? "white" : "#EC4899"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAddToCart}
            className={cn(
              "w-10 h-10 rounded-full items-center justify-center",
              "bg-pink-400"
            )}
          >
            <Ionicons name={"add"} size={20} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(
        "w-full mb-4 rounded-3xl overflow-hidden shadow-lg",
        getBgColorClass("card")
      )}
    >
      <View className="relative">
        <Image
          source={{ uri: product.thumbnail }}
          className="w-full h-48"
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={handleWishlistToggle}
          className={cn(
            "absolute top-3 left-3 w-10 h-10 rounded-full items-center justify-center shadow-lg",
            inWishlist ? "bg-red-500" : "bg-white dark:bg-gray-800",
            !inCart && "ml-0"
          )}
        >
          <Ionicons
            name={inWishlist ? "heart" : "heart-outline"}
            size={18}
            color={inWishlist ? "white" : "#EC4899"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAddToCart}
          className={cn(
            "absolute top-3 right-3 w-12 h-12 rounded-full items-center justify-center shadow-lg",
            "bg-pink-400"
          )}
        >
          <Ionicons name={"add"} size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text
          className={cn("text-sm mb-1", getTextColorClass("text-secondary"))}
          numberOfLines={1}
        >
          {product.category}
        </Text>

        <Text
          className={cn(
            "text-base font-semibold mb-2",
            getTextColorClass("text")
          )}
          numberOfLines={2}
        >
          {product.title}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className={cn("text-lg font-bold", getTextColorClass("text"))}>
            ${product.price}
          </Text>

          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text
              className={cn(
                "text-sm ml-1",
                getTextColorClass("text-secondary")
              )}
            >
              {product.rating.rate}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
