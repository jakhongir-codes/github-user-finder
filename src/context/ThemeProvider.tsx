// src/theme/ThemeProvider.tsx
import * as React from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@mui/material';
import {
  getAppThemeFromLocalStorage,
  setAppThemeToLocalStorage,
} from '../utils/storage';
import type { ColorMode } from '../types';

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: ColorMode;
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<ColorMode>(
    getAppThemeFromLocalStorage()
  );

  const colorMode = React.useMemo(
    () => ({
      mode, // 👈 expose current mode here
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === 'light' ? 'dark' : 'light';
          setAppThemeToLocalStorage(newMode);
          return newMode;
        });
      },
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode },
        shape: { borderRadius: 10 },
        typography: { fontFamily: 'Inter, Roboto, sans-serif' },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
