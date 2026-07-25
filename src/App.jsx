import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Suspense, lazy } from "react";
import { routeList } from "./routes";
import LoadingScreen from "./components/LoadingScreen";

const AuthenticationLayout = lazy(() => import("./layouts/authenticationLayout"));
const DashboardLayout = lazy(() => import("./layouts/dashboardLayout"));

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route element={<AuthenticationLayout />}>
              {routeList
                .filter((route) => route.layout === "auth" && route.path !== "*")
                .map((routeItem) => (
                  <Route
                    key={routeItem.path || routeItem.id}
                    path={routeItem.path}
                    element={
                      <ProtectedRoute isAuth={routeItem.isAuth}>
                        {routeItem.component}
                      </ProtectedRoute>
                    }
                  />
                ))}
              <Route path="*" element={<ProtectedRoute isAuth={false}><div /></ProtectedRoute>} />
            </Route>

            <Route element={<DashboardLayout />}>
              {routeList
                .filter((route) => route.layout === "dashboard")
                .map((routeItem) => (
                  <Route
                    key={routeItem.path || routeItem.id}
                    path={routeItem.path}
                    element={
                      <ProtectedRoute isAuth={routeItem.isAuth}>
                        {routeItem.component}
                      </ProtectedRoute>
                    }
                  />
                ))}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;