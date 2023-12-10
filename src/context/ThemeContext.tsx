"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<{
  theme: string | undefined;
  toggle: () => void;
}>({
  theme: undefined,
  toggle: () => {},
});

export const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState(() => getFromLocalStorage());

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme !== undefined) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
