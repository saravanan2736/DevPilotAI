import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import ErrorExplainer from "./pages/ErrorExplainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/debug"
          element={<ErrorExplainer />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
