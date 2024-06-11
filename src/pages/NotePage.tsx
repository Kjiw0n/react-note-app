import { ThemeProvider } from "styled-components";
import { useTheme } from "../hooks/useTheme";
import { lightTheme, darkTheme } from "../style/theme";
import Note from "../components/Note";

const NotePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Note isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default NotePage;
