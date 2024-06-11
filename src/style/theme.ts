const colors = {
  transparentBackground: "rgba(255, 255, 255, 0.7)",
  white: "#FFFFFF",
  black: "#000000",
  red: "#FF0000",
  gray: "#808080",
  blue: "#3587F2",
  lightgray: "#ddd",
};

const theme = { colors };

export default theme;

export const lightTheme = {
  isDarkMode: false,
  colors: {
    background: "rgba(255, 255, 255, 0.7)",
    text: "#000000",
    primary: "#6200ee",
    white: "#FFFFFF",
    black: "#000000",
    red: "#FF0000",
    gray: "#808080",
    blue: "#3587F2",
    lightgray: "#ddd",
  },
};

export const darkTheme = {
  isDarkMode: true,
  colors: {
    background: "rgba(18, 18, 18, 0.8)",
    text: "#ffffff",
    primary: "#bb86fc",
    white: "#FFFFFF",
    black: "#000000",
    red: "#FF0000",
    gray: "#808080",
    blue: "#3587F2",
    lightgray: "#ddd",
  },
};
