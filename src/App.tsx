import { Theme, ThemeProvider } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { ThemingDesigner } from "./components/ThemingDesigner";
import generateTheme from "./hooks/generate-theme";

function App() {
  const [theme, setTheme] = useState<Theme>();
  useEffect(() => {
    setTheme(generateTheme("#0078d4", "#323130", "#ffffff"));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/designer" component={ThemingDesigner} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
