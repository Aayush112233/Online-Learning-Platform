import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <CssBaseline />

      <AppRoutes />
    </>
  );
}

export default App;
