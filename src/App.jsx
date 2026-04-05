import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen w-full bg-background">
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground font-medium">Loading...</p>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              {publicRoutes.map(({ path, element, index }) => (
                <Route
                  key={path}
                  path={path}
                  element={element}
                  index={index}
                />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
