import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import ProductList from "../product-list/ProductList";
import Footer from "../../components/footer/Footer";
import AdminPage from "../admin/AdminPage";
import DashboardTab from "../admin/Tabs/DashboardTab";
import Login from "../auth/LoginPage";
import Register from "../auth/RegisterPage";
import CustomersTab from "../admin/Tabs/CustomersTab";
import OrdersTab from "../admin/Tabs/OrdersTab";
import ProductsTab from "../admin/Tabs/ProductsTab";
import ProfilePage from "../account/ProfilePage";
import AccountPage from "../account/Tabs/AccountPage";
import Orders from "../account/Tabs/Orders";
import ProtectedRoute from "./ProtectedRoute";
import { useState, useEffect } from "react";
import Cart from "../cart/Cart";
import { useLocation } from "react-router-dom";

function RoutesLayout() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setAuthenticated(!!parsedUser.email); // Set true if email exists
    } else {
      setAuthenticated(false); // User not found
    }
  }, [loc.pathname]); // Run effect on location change

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="category/" element={<ProductList />}>
            <Route path=":category" element={<ProductList />} />
          </Route>
        </Route>
        <Route
          path="profile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<ProfilePage />}
            />
          }
        >
          <Route path="settings" element={<AccountPage />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/admin" element={<AdminPage />}>
          <Route path="dashboard" index element={<DashboardTab />} />
          <Route path="customers" element={<CustomersTab />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route path="products" element={<ProductsTab />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/accounts/login" element={<Login />} />
        <Route path="/accounts/signup" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default RoutesLayout;
