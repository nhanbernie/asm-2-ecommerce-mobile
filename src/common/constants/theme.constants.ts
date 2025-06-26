export interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
}

export const lightTheme: ThemeColors = {
  primary: "#007AFF",
  background: "#FFFFFF",
  surface: "#F2F2F7",
  text: "#000000",
  textSecondary: "#8E8E93",
  border: "#C6C6C8",
  card: "#FFFFFF",
};

export const darkTheme: ThemeColors = {
  primary: "#0A84FF",
  background: "#000000",
  surface: "#1C1C1E",
  text: "#FFFFFF",
  textSecondary: "#8E8E93",
  border: "#38383A",
  card: "#1C1C1E",
};
