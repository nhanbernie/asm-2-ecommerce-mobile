import { RootStackParamList } from "@/common/types/rootParamList";
import { Button } from "@/components/ui/Button";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  InteractionManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const introductionSteps = [
  {
    id: 1,
    title: "Welcome to our SHOP.",
    description:
      "Find the best products at the best prices. We have a wide range of products to suit your needs.",
    image:
      "https://img.freepik.com/free-vector/welcome-concept-illustration_114360-2239.jpg?t=st=1721503851~exp=1721507451~hmac=172971338343068785730337e826028b15e1101a2a1731e88e482882530b078a&w=740",
    color: "#C084FC", // purple-400
  },
  {
    id: 2,
    title: "Make an order",
    description:
      "Browse thousands of high-quality products carefully selected for you and place your order.",
    image:
      "https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg?t=st=1721503901~exp=1721507501~hmac=837e3c532482314a21532e881e1c114a403414a1c1d177f74a809a550575245f&w=740",
    color: "#EC4899", // Changed from red-400
  },
  {
    id: 3,
    title: "Your purchase is complete!",
    description:
      "Congratulations! Your order has been placed and will be delivered to you in 2-3 days.",
    image:
      "https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-1486.jpg?t=st=1721503928~exp=1721507528~hmac=e153047483f11476919e258e7a8ef8d2a482a313176a8f5542f88b18642e7c8c&w=740",
    color: "#EC4899", // blue-400
  },
];

const HomePage = ({ navigation }: Props) => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;
  const imageScaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Entrance and step change animations
    fadeAnim.setValue(0);
    slideAnim.setValue(0);
    imageScaleAnim.setValue(0.8);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(imageScaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (currentStep < introductionSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      InteractionManager.runAfterInteractions(() => {
        navigation.navigate("MainApp");
      });
    }
  }, [currentStep, navigation]);

  const handleSkip = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate("MainApp");
    });
  }, [navigation]);

  const currentIntro = introductionSteps[currentStep];

  const iconRotate = iconRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const slideTransform = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const renderRegularStep = () => (
    <View className="items-center justify-center flex-1">
      <Animated.View style={{ transform: [{ scale: imageScaleAnim }] }}>
        <Image
          source={{ uri: currentIntro.image }}
          className="w-80 h-80"
          resizeMode="contain"
        />
      </Animated.View>

      <Text
        className={`text-4xl font-bold text-center mb-4 mt-8 ${getTextColorClass(
          "text"
        )}`}
        style={{ color: currentIntro.color }}
      >
        {currentIntro.title}
      </Text>

      <Text
        className={`text-lg text-center px-4 ${getTextColorClass(
          "text-secondary"
        )}`}
      >
        {currentIntro.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${getBgColorClass("background")}`}>
      {/* Skip Button */}
      <View className="absolute top-12 right-6 z-10">
        <TouchableOpacity
          onPress={handleSkip}
          className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <Text
            className={`text-sm font-medium ${getTextColorClass(
              "text-secondary"
            )}`}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress Indicators */}
      <View className="flex-row justify-center mt-16 mb-8">
        {introductionSteps.map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const inactiveColor = isDark ? "#4B5563" : "#D1D5DB";

          const backgroundColor = isActive
            ? currentIntro.color
            : isCompleted
            ? `${currentIntro.color}80`
            : inactiveColor;

          return (
            <View
              key={index}
              className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                isActive ? "w-8" : "w-2"
              }`}
              style={{ backgroundColor }}
            />
          );
        })}
      </View>

      <Animated.View
        className="flex-1 px-6"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideTransform }, { scale: scaleAnim }],
        }}
      >
        {/* Icon/Image Section */}
        {renderRegularStep()}

        {/* Navigation Buttons */}
        <View className="pb-8 px-6">
          <Button
            title={
              currentStep === introductionSteps.length - 1
                ? "Get Started"
                : "Next"
            }
            onPress={handleNext}
            className="w-full py-4 rounded-2xl mb-4"
            styles={{ backgroundColor: currentIntro.color }}
            textClassName="text-lg font-semibold"
            icon={
              <Ionicons
                name={
                  currentStep === introductionSteps.length - 1
                    ? "rocket"
                    : "arrow-forward"
                }
                size={20}
                color="white"
              />
            }
            iconPosition="right"
          />

          {currentStep > 0 && (
            <TouchableOpacity
              onPress={() => {
                setCurrentStep(currentStep - 1);
              }}
              className="flex-row items-center justify-center py-3"
            >
              <Ionicons name="arrow-back" size={16} color="#8E8E93" />
              <Text
                className={`ml-2 text-base ${getTextColorClass(
                  "text-secondary"
                )}`}
              >
                Previous
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomePage;
