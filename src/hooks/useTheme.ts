import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../components/store";

export const useTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
  }, [dispatch]);

  const toggleTheme = () => {
    if (isDarkMode) {
      dispatch(lightMode());
      localStorage.setItem("theme", "light");
    } else {
      dispatch(darkMode());
      localStorage.setItem("theme", "dark");
    }
  };

  return { isDarkMode, toggleTheme };
};
