import { StyleSheet } from "react-native";

export const settingsPageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  settingsContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 32,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 12,
  },
  button: {
    width: "100%",
  },
  buttonWithIcon: {
    flex: 1,
  },
});
