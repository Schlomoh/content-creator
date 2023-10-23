import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { css, Global } from "@emotion/react";

import { Dashboard, LoginPage, Navigation, PrivateWrapper } from "@/components";
import { theme } from "@/theme";
import { store } from "@/store";

function App() {
  const globalStyles = css`
    body {
      margin: 0;
    }
    * {
      box-sizing: border-box;
    }
  `;

  return (
    <ReduxProvider store={store}>
      <CssBaseline />
      <CssVarsProvider theme={theme} defaultMode={"dark"}>
        <Global styles={globalStyles} />
        <Navigation />

        <Routes>
          <Route
            path="/"
            element={
              <PrivateWrapper>
                <Dashboard />
              </PrivateWrapper>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </CssVarsProvider>
    </ReduxProvider>
  );
}

export default App;
