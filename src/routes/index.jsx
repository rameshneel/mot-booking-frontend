import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Loading from "./Loading";
import ProtectedRoute from "./PrivateRoute";
import ErrorBoundary from "../utils/ErrorBoundary";

const ServiceBookingForm = lazy(() =>
  import("../components/ServiceBookingForm/index")
);
const LoginPage = lazy(() => import("../components/Admin/LoginPage"));
const ForgotPassword = lazy(() => import("../components/Admin/ForgotPassword"));
const ResetPassword = lazy(() => import("../components/Admin/ResetPassword"));
const VerifyToken = lazy(() => import("../components/Admin/VerifyToken"));
const DashboardLayout = lazy(() =>
  import("../components/Admin/DashboardLayout")
);
const UserProfile = lazy(() => import("../components/Admin/UserProfile"));
const BookingbyAdminForm = lazy(() =>
  import("../components/Admin/BookingbyAdminForm")
);
const BookingManagement = lazy(() =>
  import("../components/Admin/BookingManagement")
);

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<ServiceBookingForm />} />
            <Route
              path="login"
              element={
                <ProtectedRoute
                  redirectAuthenticated={true}
                  to="/admin"
                  allowUnauthenticated={true}
                >
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="verify-token/:token" element={<VerifyToken />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <DashboardLayout />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            >
              <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<UserProfile />} />
                <Route
                  path="booking/customer"
                  element={<BookingbyAdminForm />}
                />
                <Route
                  path="booking/calender"
                  element={<BookingManagement />}
                />
              </Route>
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
