import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import Faq from "./pages/Faq.jsx";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout.jsx";
import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";

// Home Components
import Home from "./pages/Home";

// Auth Pages
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage.jsx";

// Publisher Pages
import PublisherDashboard from "./pages/Publisher/Dashboard";
import Products from "./pages/Publisher/Products";
import Promos from "./pages/Publisher/Promos";
import Orders from "./pages/Publisher/Orders";
import Profile from "./pages/Publisher/Profile";
import Withdraw from "./pages/Publisher/Withdraw";
import Balance from "./pages/Publisher/Balance";
import WebsiteStatsPage from "./components/publisher/WebsiteStatsPage";
import Deposit from "./components/Forms/Deposit";
import AddWebsiteForm from "./components/Forms/AddWebsiteForm";
import EditWebsiteForm from "./components/Forms/EditWebsiteForm";

// Advertiser Pages
import AdvertiserDashboard from "./pages/Advertiser/Dashboard";
import Projects from "./pages/Advertiser/Projects";
import Catalogue from "./pages/Advertiser/Catalogue";
import AdvertiserOrders from "./pages/Advertiser/Orders";
import Favorite from "./pages/Advertiser/Favorite";
import Cart from "./pages/Advertiser/Cart";
import AdvertiserDeposit from "./pages/Advertiser/Deposit";
import AdvertiserBalance from "./pages/Advertiser/Balance";
// import Faq from "./pages/Advertiser/Faq.jsx";
import CreateProject from "./components/Forms/CreateProject";
import ProductDetails from "./components/Product/ProductDetails";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminContent from "./pages/Admin/Content";
import AdminTransactions from "./pages/Admin/Transactions";
import AdminChatbot from "./pages/Admin/Faq";
import AdminReports from "./pages/Admin/Reports";
import AdminSettings from "./pages/Admin/Settings";
import AdminProfile from "./pages/Admin/Profile";
import { LogOutIcon, UserX } from "lucide-react";
import PaymentSuccess from "./components/payments/PaymentSuccess.jsx";
import PaymentCancel from "./components/payments/PaymentCancel.jsx";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuthStore();

  console.log("ProtectedRoutes - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoutes - user:", user);

  if (!isAuthenticated) {
    console.log("User is not authenticated. Redirecting to home.");
    return <Navigate to="/" replace />;
  }

  if (!user.isVerified) {
    console.log("User is not verified. Redirecting to verification page.");
    return <Navigate to="/verify-email" replace />;
  }

  if (user?.isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Check if the user is blocked
  if (user.status === false) {
    // Display a message in the center of the screen
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-center">
            <UserX className="size-44" />
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Account Blocked
          </h1>
          <p className="text-gray-700">
            You have been blocked by the site owner. Please contact support for
            further assistance.
          </p>

          <button
            onClick={() => logout()}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <span className="flex flex-row gap-2 items-center">
              {" "}
              <LogOutIcon className="size-8 ml-2" />
              Logout
            </span>
          </button>
        </div>
      </div>
    );
  }

  return children;
};

const AdminProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/advertiser/dashboard" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log("RedirectAuthenticatedUser  - isAuthenticated:", isAuthenticated);
  console.log("RedirectAuthenticatedUser  - user:", user);

  if (isAuthenticated && user.isVerified) {
    console.log(
      "User  is authenticated and verified. Redirecting to dashboard."
    );
    return <Navigate to="/publisher/dashboard" replace />;
  }

  return children;
};

const App = () => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "Advertiser"
  );
  const { checkAuth, isCheckingAuth, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "Publisher" ? "Advertiser" : "Publisher";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    // Keep localStorage in sync if reloaded or navigated
    localStorage.setItem("mode", mode);
  }, [mode]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Home Route */}
        <Route
          path="/"
          element={
            <RedirectAuthenticatedUser>
              <Home setIsAuthenticated={setIsAuthenticated} />
            </RedirectAuthenticatedUser>
          }
        />

        {/* Public FAQ Route */}
        <Route path="/faq" element={<Faq />} />

        {/* Auth Routes */}
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Admin Routes */}
        <Route
          element={
            <AdminProtectedRoutes>
              <AdminLayout />
            </AdminProtectedRoutes>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/faq" element={<AdminChatbot />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoutes>
              <DashboardLayout mode={mode} toggleMode={toggleMode} />
            </ProtectedRoutes>
          }
        >
          {/* Balance related routes */}
          <Route path="/balance" element={<Balance />} />
          <Route path="/balance/deposit" element={<Deposit />} />
          <Route path="/balance/withdraw" element={<Withdraw />} />

          {/* Publisher routes */}
          {mode === "Publisher" ? (
            <>
              <Route
                path="/publisher/dashboard"
                element={<PublisherDashboard />}
              />
              <Route
                path="/publisher/products"
                element={<Products toggleMode={toggleMode} />}
              />
              <Route path="/publisher/products/:websiteId/stats" element={<WebsiteStatsPage />} />
              <Route
                path="/publisher/products/add"
                element={<AddWebsiteForm />}
              />
              <Route
                path="/publisher/products/:id/edit"
                element={<EditWebsiteForm />}
              />
              <Route path="/publisher/promos" element={<Promos />} />
              <Route path="/publisher/orders" element={<Orders />} />
              <Route path="/publisher/profile" element={<Profile />} />
              <Route path="/publisher/faq" element={<Faq />} />

            </>
          ) : (
            <>
              <Route
                path="/advertiser/dashboard"
                element={<AdvertiserDashboard />}
              />
              <Route path="/advertiser/projects" element={<Projects />} />
              <Route
                path="/advertiser/projects/create"
                element={<CreateProject />}
              />
              <Route path="/advertiser/catalogue" element={<Catalogue />} />
              <Route
                path="/advertiser/products/view/:id"
                element={<ProductDetails />}
              />
              <Route path="/advertiser/orders" element={<AdvertiserOrders />} />
              <Route path="/advertiser/favorite" element={<Favorite />} />
              <Route path="/advertiser/profile" element={<Profile />} />
              <Route path="/advertiser/cart" element={<Cart />} />
              // In the advertiser routes section:
<Route path="/advertiser/payment-success/:orderId" element={<PaymentSuccess />} />
<Route path="/advertiser/payment-cancel::orderId" element={<PaymentCancel />} />
              <Route
                path="/advertiser/deposit"
                element={<AdvertiserDeposit />}
              />
              <Route
                path="/advertiser/balance"
                element={<AdvertiserBalance />}
              />
              <Route path="/advertiser/faq" element={<Faq />} />
            </>
          )}

          {/* Default redirects */}
          <Route
            path="*"
            element={
              <Navigate
                to={
                  mode === "Publisher"
                    ? "/publisher/dashboard"
                    : "/advertiser/dashboard"
                }
              />
            }
          />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
