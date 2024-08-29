import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "./routes/route";
import { drillBitTheme } from "./theme/index";
import { LoadingIndicator } from "./component";
import "./App.css";

const App = () => {
  const routing = useRoutes(routes);
  const theme = createTheme(drillBitTheme);
  return (
    <>
      <Suspense fallback={<LoadingIndicator />}>
        <ToastContainer />
        <ThemeProvider theme={theme}>{routing}</ThemeProvider>
      </Suspense>
    </>
  );
};

export default App;
