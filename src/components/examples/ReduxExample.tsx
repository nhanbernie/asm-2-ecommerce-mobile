import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setUser, updateUser } from "@/redux/slices/userSlice";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/api/userApi";
import { useThemeClasses } from "@/hooks/useThemeClasses";
import { Button } from "@/components/ui/Button";
import React from "react";
import { View, Text } from "react-native";

const ReduxExample = () => {
  const { getBgColorClass, getTextColorClass } = useThemeClasses();
  const dispatch = useAppDispatch();
  const { currentUser, isLoading } = useAppSelector((state) => state.user);

  const {
    data: userData,
    error,
    isLoading: isQueryLoading,
  } = useGetUserQuery("1", {
    skip: !!currentUser,
  });

  const [updateUserMutation, { isLoading: isUpdating }] =
    useUpdateUserMutation();

  const handleLoadUser = () => {
    if (userData) {
      dispatch(setUser(userData));
    }
  };

  const handleUpdateUser = async () => {
    if (currentUser) {
      try {
        const result = await updateUserMutation({
          id: currentUser.id,
          name: "Updated Name",
          bio: "Updated bio via RTK Query",
        }).unwrap();
        dispatch(updateUser(result));
      } catch (error) {
        console.error("Update failed:", error);
      }
    }
  };

  return (
    <View
      className={`flex-1 p-5 justify-center ${getBgColorClass("background")}`}
    >
      <Text
        className={`text-2xl font-bold text-center mb-5 ${getTextColorClass(
          "text"
        )}`}
      >
        Redux Toolkit Demo
      </Text>

      {isQueryLoading && (
        <Text
          className={`text-center my-3 ${getTextColorClass("text-secondary")}`}
        >
          Loading user data...
        </Text>
      )}

      {error && (
        <Text className="text-center my-3 text-red-500">
          Error loading user
        </Text>
      )}

      {currentUser ? (
        <View className={`p-5 rounded-xl my-5 ${getBgColorClass("card")}`}>
          <Text
            className={`text-lg font-semibold mb-1 ${getTextColorClass(
              "text"
            )}`}
          >
            {currentUser.name}
          </Text>
          <Text
            className={`text-sm mb-3 ${getTextColorClass("text-secondary")}`}
          >
            {currentUser.email}
          </Text>
          <Text
            className={`text-sm leading-5 ${getTextColorClass(
              "text-secondary"
            )}`}
          >
            {currentUser.bio}
          </Text>
        </View>
      ) : (
        <Button
          title="Load User Data"
          onPress={handleLoadUser}
          disabled={!userData}
        />
      )}

      {currentUser && (
        <Button
          title={isUpdating ? "Updating..." : "Update User"}
          onPress={handleUpdateUser}
          disabled={isUpdating}
          variant="secondary"
        />
      )}
    </View>
  );
};

export default ReduxExample;
