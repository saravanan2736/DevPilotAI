import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(
  () => import("./pages/Dashboard")
);
const Chat = lazy(() => import("./pages/Chat"));
const ErrorExplainer = lazy(
  () => import("./pages/ErrorExplainer")
);

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B]">
      <div className="text-center">
        <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-500" />

        <p className="mt-3 text-sm text-zinc-500">
          Loading DevPilot...
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/chat"
            element={<Chat />}
          />

          <Route
            path="/debug"
            element={<ErrorExplainer />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
