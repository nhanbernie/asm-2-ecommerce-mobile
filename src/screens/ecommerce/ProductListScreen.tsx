import { RootStackParamList } from "@/common/types/rootParamList";
import { Badge, Chip, Input, Spinner } from "@/components/ui";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/screens/ecommerce/components/ProductCard";
import { Product } from "@/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProductListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ProductList">;
};

const categories = [
  "All",
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

export const ProductListScreen = ({ navigation }: ProductListScreenProps) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    searchProducts,
    filterByCategory,
    clearFilters,
  } = useProducts(4);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim()) {
        searchProducts(query);
        setSelectedCategory("All");
      } else {
        clearFilters();
        setSelectedCategory("All");
      }
    },
    [searchProducts, clearFilters]
  );

  const handleCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      setSearchQuery("");
      if (category === "All") {
        clearFilters();
      } else {
        filterByCategory(category);
      }
    },
    [filterByCategory, clearFilters]
  );

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate("ProductDetail", { productId: product.id });
    },
    [navigation]
  );

  const handleCartPress = useCallback(() => {
    navigation.navigate("Cart");
  }, [navigation]);

  const handleWishlistPress = useCallback(() => {
    navigation.navigate("Wishlist");
  }, [navigation]);

  const renderProductItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <View className={viewMode === "grid" ? "w-1/2 px-2" : "w-full"}>
        <ProductCard
          product={item}
          onPress={() => handleProductPress(item)}
          variant={viewMode}
        />
      </View>
    ),
    [viewMode, handleProductPress]
  );

  const renderListHeader = () => (
    <View className="px-4 pb-4">
      {/* Header */}
      <View className="flex-row items-end justify-between mb-6">
        <View className="flex-1 pr-4">
          <Text
            className={cn(
              "text-2xl font-bold",
              getTextColorClass("text-secondary")
            )}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Hey Sophia
          </Text>
          <Text
            className={cn("text-2xl font-bold", getTextColorClass("text"))}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            What are you looking for today?
          </Text>
        </View>

        <View className="flex-row gap-3 items-center">
          <TouchableOpacity
            onPress={handleWishlistPress}
            className="relative p-2"
          >
            <Ionicons name="heart-outline" size={28} color="#EC4899" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCartPress} className="relative p-2">
            <Ionicons name="bag-outline" size={28} color="#EC4899" />
            {totalItems > 0 && (
              <View className="absolute -top-1 -right-1">
                <Badge variant="error" size="sm">
                  {totalItems}
                </Badge>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <Input
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
        leftIcon={<Ionicons name="search" size={20} color="#8E8E93" />}
        rightIcon={
          <TouchableOpacity
            onPress={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="w-8 h-8 items-center justify-center"
          >
            <Ionicons
              name={viewMode === "grid" ? "list" : "grid"}
              size={20}
              color="#8E8E93"
            />
          </TouchableOpacity>
        }
        className="mb-4"
      />

      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        renderItem={({ item }) => (
          <Chip
            key={item}
            selected={selectedCategory === item}
            onPress={() => handleCategorySelect(item)}
            className="mr-2 "
          >
            {item === "All" ? "All" : item.replace("-", " ")}
          </Chip>
        )}
        className="mb-4"
      />

      {/* Results info */}
      <View className="flex-row items-center justify-between mb-2">
        <Text
          className={cn("text-base font-semibold", getTextColorClass("text"))}
        >
          {products.length} Products
        </Text>
        {(searchQuery || selectedCategory !== "All") && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              clearFilters();
            }}
            className=""
          >
            <Text className="text-[#EC4899] font-medium">Clear filters</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderListFooter = () => {
    if (!loading || products.length === 0) return null;

    return (
      <View className="flex-row justify-center items-center">
        {!loading ? (
          <Text className="text-base text-white font-semibold">
            Swipe up to view more
          </Text>
        ) : (
          <View className="py-4">
            <Spinner size="md" />
          </View>
        )}
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (loading && products.length === 0) {
      return (
        <View className="flex-1 justify-center items-center py-20">
          <Spinner size="lg" />
          <Text
            className={cn(
              "text-base mt-4",
              getTextColorClass("text-secondary")
            )}
          >
            Loading products...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 justify-center items-center py-20">
          <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
          <Text
            className={cn(
              "text-base mt-4 text-center",
              getTextColorClass("text")
            )}
          >
            {error}
          </Text>
          <TouchableOpacity
            onPress={refresh}
            className="mt-4 px-6 py-2 rounded-full"
            style={{ backgroundColor: "#EC4899" }}
          >
            <Text className="text-white font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="flex-1 justify-center items-center py-20">
        <Ionicons name="search-outline" size={48} color="#8E8E93" />
        <Text
          className={cn("text-base mt-4", getTextColorClass("text-secondary"))}
        >
          No products found
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      className={cn("flex-1", getBgColorClass("background"))}
      edges={["top"]}
      style={{ marginBlockEnd: 10 }}
    >
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={viewMode === "grid" ? 2 : 1}
        key={viewMode}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyComponent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refresh} />
        }
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
