import RootNavigator from "@/navigation/RootNavigator";
import AppProvider from "@/providers/AppProvider";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
