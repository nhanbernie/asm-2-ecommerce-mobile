import React, { createContext, useContext, useReducer, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/services/api";

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: Product[] };

interface WishlistContextType extends WishlistState {
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const WISHLIST_STORAGE_KEY = "ecommerce_wishlist";

const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return state; // Already in wishlist
      }
      return {
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM": {
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "CLEAR_WISHLIST":
      return { items: [] };

    case "LOAD_WISHLIST":
      return { items: action.payload };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
  });

  React.useEffect(() => {
    loadWishlist();
  }, []);

  React.useEffect(() => {
    saveWishlist(state.items);
  }, [state.items]);

  const loadWishlist = async () => {
    try {
      const wishlistData = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (wishlistData) {
        const items: Product[] = JSON.parse(wishlistData);
        dispatch({ type: "LOAD_WISHLIST", payload: items });
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  const saveWishlist = async (items: Product[]) => {
    try {
      await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
  };

  const isInWishlist = (id: number) => {
    return state.items.some((item) => item.id === id);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const value: WishlistContextType = {
    ...state,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
