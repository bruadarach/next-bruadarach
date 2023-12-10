"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
