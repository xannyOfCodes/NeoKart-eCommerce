import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import ProductDetail from "./components/Product/ProductDetail";
import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import PlainLayout from "./layouts/PlainLayout";
import { ToastContainer } from "react-toastify";
import type { ReactNode } from "react";

const RedirectIfAuth = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
      {/* Public Routes */}
      <Route path="/welcome" element={<WelcomePage />} />
      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectIfAuth>
            <Signup />
          </RedirectIfAuth>
        }
      />

      {/* Protected Routes */}
      <Route path="/"
        element={
          <ProtectedRoute>
            <Outlet/>
          </ProtectedRoute>
        }
      >
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Route>
        <Route element={<PlainLayout />}>
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Route>
      
    </>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthProvider>
  );
};

export default App;
