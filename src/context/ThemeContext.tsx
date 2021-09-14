import { createContext, Dispatch, SetStateAction, useContext } from "react";
interface IThemeContextValue {
  primaryTheme: IPrimaryTheme;
  setPrimaryTheme: Dispatch<SetStateAction<IPrimaryTheme>>;
}

export interface IPrimaryTheme {
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
}

export const ThemeContext = createContext<IThemeContextValue>(
  {} as IThemeContextValue
);

export const useTheme = () => useContext(ThemeContext);
