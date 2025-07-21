import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  MainApp: undefined;
  ProductDetail: { productId: number };
};

export type TabParamList = {
  ProductList: undefined;
  Cart: undefined;
  Wishlist: undefined;
  Settings: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
