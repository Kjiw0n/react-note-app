import { ThemeProvider } from "styled-components";
import { useTheme } from "../hooks/useTheme";
import { lightTheme, darkTheme } from "../style/theme";
import Main from "../components/Main";

const MainPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Main isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default MainPage;
