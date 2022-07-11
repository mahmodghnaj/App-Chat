import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
export type typeThem = "dark" | "light";
export const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export default themes;
