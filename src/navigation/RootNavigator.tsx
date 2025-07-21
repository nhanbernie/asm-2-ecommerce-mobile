import { RootStackParamList } from "@/common/types/rootParamList";
import { HomePage, ProductDetailScreen } from "@/screens";
import { TabNavigator } from "@/navigation/tab/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
