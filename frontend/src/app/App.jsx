import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@app/routes/AppRoutes";
import SessionBridge from "@features/authentication/presentation/SessionBridge";

function App() {
  return (
    <BrowserRouter>
      <SessionBridge>
        <AppRoutes />
      </SessionBridge>
    </BrowserRouter>
  );
}

export default App;
