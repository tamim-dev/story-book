import { useCallback, useEffect, useState } from "react";
import {
  applyThemeToDocument,
  getStoredTheme,
  getSystemTheme,
  setStoredTheme,
  type Theme,
} from "../lib/theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => getStoredTheme() ?? getSystemTheme(),
  );

  useEffect(() => {
    applyThemeToDocument(theme);
    setStoredTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggleTheme };
}
