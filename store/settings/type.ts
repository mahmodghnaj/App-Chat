import { typeThem } from "./themes";

export type SettingsType = {
  defaultTheme: string;
  changeTheme: (theme: typeThem) => void;
};
