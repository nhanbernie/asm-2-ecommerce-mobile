import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button, Badge, Spinner, Divider } from "@/components/ui";
import { cn } from "@/lib/utils";
import { RootStackParamList } from "@/common/types/rootParamList";
import Ionicons from "@expo/vector-icons/Ionicons";
const { width: screenWidth } = Dimensions.get("window");

type ProductDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ProductDetail">;
  route: RouteProp<RootStackParamList, "ProductDetail">;
};

export const ProductDetailScreen = ({
  navigation,
  route,
}: ProductDetailScreenProps) => {
  const { productId } = route.params;
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const { product, loading, error, refetch } = useProductDetail(productId);
  const { addItem, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const inCart = product ? isInCart(product.id) : false;
  const cartQuantity = product ? getItemQuantity(product.id) : 0;
  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;

    if (inCart) {
      updateQuantity(product.id, cartQuantity + selectedQuantity);
    } else {
      // Add multiple items at once
      for (let i = 0; i < selectedQuantity; i++) {
        addItem(product);
      }
    }
  };

  const handleGoToCart = () => {
    navigation.navigate("Cart");
  };

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView
        className={cn(
          "flex-1 justify-center items-center",
          getBgColorClass("background")
        )}
      >
        <Spinner size="lg" />
        <Text
          className={cn("text-base mt-4", getTextColorClass("text-secondary"))}
        >
          Loading product details...
        </Text>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView
        className={cn(
          "flex-1 justify-center items-center",
          getBgColorClass("background")
        )}
      >
        <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
        <Text
          className={cn(
            "text-base mt-4 text-center",
            getTextColorClass("text")
          )}
        >
          {error || "Product not found"}
        </Text>
        <Button title="Try Again" onPress={refetch} className="mt-4" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={cn("flex-1", getBgColorClass("background"))} edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity
          onPress={handleBack}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 items-center justify-center shadow-md"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text
          className={cn("text-lg font-semibold", getTextColorClass("text"))}
        >
          Product Detail
        </Text>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handleWishlistToggle}
            className={cn(
              "w-10 h-10 rounded-full items-center justify-center shadow-md",
              inWishlist ? "bg-red-500" : "bg-white dark:bg-gray-800"
            )}
          >
            <Ionicons
              name={inWishlist ? "heart" : "heart-outline"}
              size={20}
              color={inWishlist ? "white" : "#EC4899"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoToCart} className="relative p-2">
            <Ionicons name="bag-outline" size={24} color="#EC4899" />
            {cartQuantity > 0 && (
              <View className="absolute -top-1 -right-1">
                <Badge variant="error" size="sm">
                  {cartQuantity}
                </Badge>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="relative">
          <Image
            // source={{ uri: product.images }}
            style={{ width: screenWidth, height: screenWidth * 0.8 }}
            resizeMode="cover"
          />

          {inCart && (
            <View className="absolute top-4 right-4">
              <Badge variant="success" size="lg">
                {cartQuantity} in cart
              </Badge>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View
          className={cn("p-6 rounded-t-3xl -mt-6", getBgColorClass("card"))}
        >
          <View className="flex-row items-center mb-3">
            <Badge variant="secondary" size="sm">
              {product.category}
            </Badge>

            <View className="flex-row items-center ml-auto">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text
                className={cn(
                  "text-sm ml-1",
                  getTextColorClass("text-secondary")
                )}
              >
                {product.rating.rate} ({product.rating.count} reviews)
              </Text>
            </View>
          </View>

          <Text
            className={cn("text-2xl font-bold mb-4", getTextColorClass("text"))}
          >
            {product.title}
          </Text>

          <Text className={cn("text-3xl font-bold text-pink-500 mb-6")}>
            ${product.price}
          </Text>

          <Divider label="Description" />

          <Text
            className={cn(
              "text-base leading-6 mb-6",
              getTextColorClass("text-secondary")
            )}
          >
            {product.description}
          </Text>

          {/* Quantity Selector */}
          <View className="mb-6">
            <Text
              className={cn(
                "text-lg font-semibold mb-3",
                getTextColorClass("text")
              )}
            >
              Quantity
            </Text>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() =>
                  setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                }
                className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900 items-center justify-center"
              >
                <Ionicons name="remove" size={20} color="#EC4899" />
              </TouchableOpacity>

              <Text
                className={cn(
                  "mx-6 text-xl font-bold min-w-[40px] text-center",
                  getTextColorClass("text")
                )}
              >
                {selectedQuantity}
              </Text>

              <TouchableOpacity
                onPress={() => setSelectedQuantity(selectedQuantity + 1)}
                className="w-12 h-12 rounded-full bg-pink-400 items-center justify-center"
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Total Price */}
          <View
            className={cn("p-4 rounded-2xl mb-6", getBgColorClass("surface"))}
          >
            <View className="flex-row justify-between items-center">
              <Text
                className={cn("text-lg", getTextColorClass("text-secondary"))}
              >
                Total ({selectedQuantity} items)
              </Text>
              <Text
                className={cn("text-2xl font-bold", getTextColorClass("text"))}
              >
                ${(product.price * selectedQuantity).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <Button
              title={
                inCart
                  ? `Update Cart (+${selectedQuantity})`
                  : `Add to Cart (${selectedQuantity})`
              }
              onPress={handleAddToCart}
              className="flex-1"
              icon={<Ionicons name="bag-add" size={20} color="white" />}
            />

            {inCart && (
              <Button
                title="View Cart"
                variant="outline"
                onPress={handleGoToCart}
                icon={<Ionicons name="bag-outline" size={20} color="#EC4899" />}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
