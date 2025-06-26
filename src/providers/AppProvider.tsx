import { ThemeProvider } from "@/contexts/ThemeContext";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
