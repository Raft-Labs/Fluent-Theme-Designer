import { Theme, ThemeProvider } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { ThemingDesigner } from "./components/ThemingDesigner";
import { IPrimaryTheme, ThemeContext } from "./context/ThemeContext";
import generateTheme from "./hooks/generate-theme";

function App() {
  const [theme, setTheme] = useState<Theme>();
  const [primaryTheme, setPrimaryTheme] = useState<IPrimaryTheme>({
    primaryColor: "#0078d4",
    textColor: "#323130",
    backgroundColor: "#ffffff",
  });
  const value = { primaryTheme, setPrimaryTheme };

  useEffect(() => {
    setTheme(
      generateTheme(
        primaryTheme.primaryColor,
        primaryTheme.textColor,
        primaryTheme.backgroundColor
      )
    );
  }, [primaryTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <div className="App">
            <Home />
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/designer" component={ThemingDesigner} />
            </Switch>
          </div>
        </HashRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
