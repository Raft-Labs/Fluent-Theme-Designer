import {
  Async,
  BaseSlots,
  createTheme,
  getColorFromString,
  IColor,
  IconButton,
  isDark,
  IStackProps,
  ITheme,
  IThemeRules,
  mergeStyles,
  PrimaryButton,
  Stack,
  Text,
  ThemeGenerator,
  ThemeProvider,
  themeRulesStandardCreator,
} from "@fluentui/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import React from "react";
import { IPrimaryTheme, useTheme } from "../../context/ThemeContext";
import { AccessibilityChecker } from "./AccessibilityChecker";
import { MainPanelWidth } from "./MainPanelStyles";
import { Samples } from "./Samples";
import { ThemeDesignerColorPicker } from "./ThemeDesignerColorPicker";

initializeIcons();

export interface IThemingDesignerState {
  primaryColor: IColor;
  textColor: IColor;
  backgroundColor: IColor;
  theme?: ITheme;
  themeRules?: IThemeRules;
}

const Page = (props: IStackProps) => (
  <Stack
    gap={10}
    className={mergeStyles({
      height: "100vh",
      overflow: "hidden",
      selectors: {
        ":global(body)": {
          padding: 0,
          margin: 0,
        },
      },
    })}
    {...props}
  />
);

const Content = (props: IStackProps) => (
  <Stack
    horizontal
    gap={10}
    className={mergeStyles({ overflow: "hidden" })}
    {...props}
  />
);

const Sidebar = (props: IStackProps) => (
  <Stack
    disableShrink
    gap={20}
    grow={0}
    className={mergeStyles({
      borderRight: "1px solid #ddd",
      paddingRight: "1rem",
    })}
    {...props}
  />
);

const Main = (props: IStackProps) => (
  <Stack
    grow={1}
    disableShrink
    className={mergeStyles({
      minWidth: MainPanelWidth,
      overflow: "scroll",
    })}
    {...props}
  />
);

const GlobalChanger = ({
  primaryColor,
  textColor,
  backgroundColor,
}: IPrimaryTheme) => {
  const { setPrimaryTheme } = useTheme();
  const applyChange = () =>
    setPrimaryTheme({
      primaryColor: `#${primaryColor}`,
      textColor: `#${textColor}`,
      backgroundColor: `#${backgroundColor}`,
    });
  return <PrimaryButton text="Apply Change Globaly" onClick={applyChange} />;
};

export class ThemingDesigner extends React.Component<
  {},
  IThemingDesignerState
> {
  private _colorChangeTimeout: number = 0;
  private _async: Async;

  constructor(props: {}) {
    super(props);

    this._async = new Async(this);

    this.state = this._buildInitialState();
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render() {
    return (
      <Page>
        <Content>
          <Sidebar>
            <Text
              variant={"xLarge"}
              styles={{ root: { fontWeight: 600, marginLeft: 20 } }}
            >
              <IconButton
                disabled={false}
                checked={false}
                iconProps={{
                  iconName: "Color",
                  styles: { root: { fontSize: "20px", marginRight: 12 } },
                }}
                title="Colors"
                ariaLabel="Colors"
              />
              Color
            </Text>
            {/* the three base slots, prominently displayed at the top of the page */}
            <ThemeDesignerColorPicker
              color={this.state.primaryColor}
              onColorChange={this._onPrimaryColorPickerChange}
              label={"Primary color"}
            />
            <ThemeDesignerColorPicker
              color={this.state.textColor}
              onColorChange={this._onTextColorPickerChange}
              label={"Text color"}
            />
            <ThemeDesignerColorPicker
              color={this.state.backgroundColor}
              onColorChange={this._onBkgColorPickerChange}
              label={"Background color"}
            />
            <Stack>
              <Stack.Item>
                <GlobalChanger
                  backgroundColor={this.state.backgroundColor.hex}
                  primaryColor={this.state.primaryColor.hex}
                  textColor={this.state.textColor.hex}
                />
              </Stack.Item>
            </Stack>
          </Sidebar>
          <Main>
            <ThemeProvider theme={this.state.theme}>
              <Samples
                backgroundColor={this.state.backgroundColor.str}
                textColor={this.state.textColor.str}
              />
            </ThemeProvider>
            <AccessibilityChecker
              theme={this.state.theme}
              themeRules={this.state.themeRules}
            />
          </Main>
        </Content>
      </Page>
    );
  }

  private _onPrimaryColorPickerChange = (newColor: IColor | undefined) => {
    this._onColorChange(
      this.state.primaryColor,
      BaseSlots.primaryColor,
      newColor
    );
  };

  private _onTextColorPickerChange = (newColor: IColor | undefined) => {
    this._onColorChange(
      this.state.textColor,
      BaseSlots.foregroundColor,
      newColor
    );
  };

  private _onBkgColorPickerChange = (newColor: IColor | undefined) => {
    this._onColorChange(
      this.state.backgroundColor,
      BaseSlots.backgroundColor,
      newColor
    );
  };

  private _makeNewTheme = (): void => {
    if (this.state.themeRules) {
      const themeAsJson: {
        [key: string]: string;
      } = ThemeGenerator.getThemeAsJson(this.state.themeRules);

      const finalTheme = createTheme({
        ...{ palette: themeAsJson },
        isInverted: isDark(
          this.state.themeRules[BaseSlots[BaseSlots.backgroundColor]].color!
        ),
      });
      this.setState({ theme: finalTheme });
    }
  };

  private _onColorChange = (
    colorToChange: IColor,
    baseSlot: BaseSlots,
    newColor: IColor | undefined
  ) => {
    if (this._colorChangeTimeout) {
      this._async.clearTimeout(this._colorChangeTimeout);
    }
    if (newColor) {
      if (colorToChange === this.state.primaryColor) {
        this.setState({ primaryColor: newColor });
      } else if (colorToChange === this.state.textColor) {
        this.setState({ textColor: newColor });
      } else if (colorToChange === this.state.backgroundColor) {
        this.setState({ backgroundColor: newColor });
      } else {
        return;
      }
      this._colorChangeTimeout = this._async.setTimeout(() => {
        const themeRules = this.state.themeRules;
        if (themeRules) {
          const currentIsDark = isDark(
            themeRules[BaseSlots[BaseSlots.backgroundColor]].color!
          );
          ThemeGenerator.setSlot(
            themeRules[BaseSlots[baseSlot]],
            newColor,
            currentIsDark,
            true,
            true
          );
          if (
            currentIsDark !==
            isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)
          ) {
            // isInverted got swapped, so need to refresh slots with new shading rules
            ThemeGenerator.insureSlots(themeRules, currentIsDark);
          }
        }
        this.setState({ themeRules: themeRules }, this._makeNewTheme);
      }, 20);
      // 20ms is low enough that you can slowly drag to change color and see that theme,
      // but high enough that quick changes don't get bogged down by a million changes inbetween
    }
  };

  private _buildInitialState = (): IThemingDesignerState => {
    const themeRules = themeRulesStandardCreator();
    const colors = {
      primaryColor: getColorFromString("#0078d4")!,
      textColor: getColorFromString("#323130")!,
      backgroundColor: getColorFromString("#ffffff")!,
    };
    ThemeGenerator.insureSlots(
      themeRules,
      isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)
    );
    ThemeGenerator.setSlot(
      themeRules[BaseSlots[BaseSlots.primaryColor]],
      colors.primaryColor,
      undefined,
      false,
      false
    );
    ThemeGenerator.setSlot(
      themeRules[BaseSlots[BaseSlots.foregroundColor]],
      colors.textColor,
      undefined,
      false,
      false
    );
    ThemeGenerator.setSlot(
      themeRules[BaseSlots[BaseSlots.backgroundColor]],
      colors.backgroundColor,
      undefined,
      false,
      false
    );

    const themeAsJson: {
      [key: string]: string;
    } = ThemeGenerator.getThemeAsJson(themeRules);

    const finalTheme = createTheme({
      ...{ palette: themeAsJson },
      isInverted: isDark(
        themeRules[BaseSlots[BaseSlots.backgroundColor]].color!
      ),
    });

    const state = {
      ...colors,
      theme: finalTheme,
      themeRules: themeRules,
    };

    return state;
  };
}
