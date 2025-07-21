import { TabScreenProps } from "@/common/types/rootParamList";
import { Button } from "@/components/ui";
import { useWishlist } from "@/contexts/WishlistContext";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/screens/ecommerce/components/ProductCard";
import { Product } from "@/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type WishlistScreenProps = TabScreenProps<"Wishlist">;

export const WishlistScreen = ({ navigation }: WishlistScreenProps) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const { items, clearWishlist } = useWishlist();

  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  const renderWishlistItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => (
    <View className="w-1/2 px-2">
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item)}
        variant="grid"
      />
    </View>
  );

  const renderEmptyWishlist = () => (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-6">
        <Ionicons name="heart-outline" size={64} color="#9CA3AF" />
      </View>

      <Text
        className={cn(
          "text-2xl font-bold mb-2 text-center",
          getTextColorClass("text")
        )}
      >
        Your wishlist is empty
      </Text>

      <Text
        className={cn(
          "text-center mb-8 leading-6",
          getTextColorClass("text-secondary")
        )}
      >
        Save your favorite items by tapping the heart icon on any product!
      </Text>

      <Button
        title="Browse Products"
        onPress={() => navigation.navigate("ProductList")}
        className="w-full"
        styles={{ backgroundColor: "#EC4899" }}
      />
    </View>
  );

  const renderHeader = () => (
    <View className="flex-row items-center justify-between px-6 pt-4 mb-6">
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductList")}
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center"
      >
        <Ionicons name="arrow-back" size={20} color="#6B7280" />
      </TouchableOpacity>

      <View className="flex-1 mx-4">
        <Text
          className={cn(
            "text-2xl font-bold text-center",
            getTextColorClass("text")
          )}
        >
          Wishlist
        </Text>
        <Text
          className={cn(
            "text-center text-sm",
            getTextColorClass("text-secondary")
          )}
        >
          {items.length} {items.length === 1 ? "item" : "items"}
        </Text>
      </View>

      {items.length > 0 && (
        <TouchableOpacity onPress={clearWishlist}>
          <View className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 items-center justify-center">
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView
        className={cn("flex-1", getBgColorClass("background"))}
        edges={["top"]}
      >
        {renderHeader()}
        {renderEmptyWishlist()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={cn("flex-1", getBgColorClass("background"))}
      edges={["top"]}
    >
      <FlatList
        data={items}
        renderItem={renderWishlistItem}
        keyExtractor={(item, index) => `wishlist-item-${item.id}-idx-${index}`}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View className="h-4" />}
        key={`wishlist-grid-${items.length}`}
      />
    </SafeAreaView>
  );
};
