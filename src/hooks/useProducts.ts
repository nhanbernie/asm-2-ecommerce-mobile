import { useState, useEffect, useCallback } from "react";
import { apiService, Product, PaginatedResponse } from "@/services/api";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  clearFilters: () => Promise<void>;
}

export const useProducts = (initialLimit = 12): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const loadProducts = useCallback(
    async (
      skipCount: number = 0,
      reset: boolean = false,
      query: string = "",
      category: string = ""
    ) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        let response: PaginatedResponse<Product>;

        if (query) {
          response = await apiService.searchProducts(query, initialLimit);
        } else if (category) {
          response = await apiService.getProductsByCategory(
            category,
            initialLimit
          );
        } else {
          response = await apiService.getProducts(initialLimit, skipCount);
        }

        if (reset) {
          setProducts(response.products);
          setSkip(response.products.length);
        } else {
          setProducts((prev) => [...prev, ...response.products]);
          setSkip((prev) => prev + response.products.length);
        }

        setHasMore(
          response.products.length === initialLimit &&
            skipCount + response.products.length < response.total
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, initialLimit]
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await loadProducts(skip, false, searchQuery, selectedCategory);
  }, [hasMore, loading, skip, searchQuery, selectedCategory, loadProducts]);

  const refresh = useCallback(async () => {
    setSkip(0);
    setHasMore(true);
    await loadProducts(0, true, searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, loadProducts]);

  const searchProducts = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setSelectedCategory("");
      setSkip(0);
      setHasMore(true);
      await loadProducts(0, true, query, "");
    },
    [loadProducts]
  );

  const filterByCategory = useCallback(
    async (category: string) => {
      setSelectedCategory(category);
      setSearchQuery("");
      setSkip(0);
      setHasMore(true);
      await loadProducts(0, true, "", category);
    },
    [loadProducts]
  );

  const clearFilters = useCallback(async () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSkip(0);
    setHasMore(true);
    await loadProducts(0, true, "", "");
  }, [loadProducts]);

  useEffect(() => {
    loadProducts(0, true);
  }, []);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    searchProducts,
    filterByCategory,
    clearFilters,
  };
};
