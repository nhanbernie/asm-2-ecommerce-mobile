import { StyleSheet } from "react-native";

export const editProfilePageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    flexGrow: 1,
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
  form: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
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
