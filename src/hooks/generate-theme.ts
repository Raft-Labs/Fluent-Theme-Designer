import {
  BaseSlots,
  createTheme,
  getColorFromString,
  isDark,
  Theme,
  ThemeGenerator,
  themeRulesStandardCreator,
} from "@fluentui/react";

const generateTheme = (
  primaryColor?: string,
  textColor?: string,
  backgroundColor?: string
): Theme => {
  const themeRules = themeRulesStandardCreator();
  const colors = {
    pColor: getColorFromString(primaryColor || "#0078d4")!,
    tColor: getColorFromString(textColor || "#323130")!,
    bColor: getColorFromString(backgroundColor || "#ffffff")!,
  };

  const currentIsDark = isDark(
    themeRules[BaseSlots[BaseSlots.backgroundColor]].color!
  );

  ThemeGenerator.insureSlots(themeRules, currentIsDark);

  ThemeGenerator.setSlot(
    themeRules[BaseSlots[BaseSlots.primaryColor]],
    colors.pColor,
    currentIsDark,
    true,
    true
  );
  ThemeGenerator.setSlot(
    themeRules[BaseSlots[BaseSlots.foregroundColor]],
    colors.tColor,
    currentIsDark,
    true,
    true
  );
  ThemeGenerator.setSlot(
    themeRules[BaseSlots[BaseSlots.backgroundColor]],
    colors.bColor,
    currentIsDark,
    true,
    true
  );

  const themeAsJson: {
    [key: string]: string;
  } = ThemeGenerator.getThemeAsJson(themeRules);

  const finalTheme = createTheme({
    ...{ palette: themeAsJson },
    isInverted: currentIsDark,
  });

  return finalTheme;
};

export default generateTheme;
