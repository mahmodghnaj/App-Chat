import {
  Children,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import themes, { typeThem } from "./themes";
import { SettingsType } from "./type";

export type SettingsProviderProps = {
  children: ReactNode;
};
export const SettingsContext = createContext({});

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [defaultTheme, setChangeTheme] = useState<typeThem>("dark");
  const changeTheme = (theme: typeThem) => {
    setChangeTheme(theme);
  };
  const value: SettingsType = {
    changeTheme,
    defaultTheme,
  };
  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={themes[defaultTheme]}>{children}</ThemeProvider>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext) as SettingsType;
