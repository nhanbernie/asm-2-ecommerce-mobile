import { StyleSheet } from "react-native";

export const profilePageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    flexGrow: 1,
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
  },
  button: {
    width: "100%",
  },
});
