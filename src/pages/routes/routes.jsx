import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import ProductList from "../product-list/ProductList";
import Footer from "../../components/footer/Footer";
import AdminPage from "../admin/AdminPage";
import DashboardTab from "../admin/Tabs/DashboardTab";
import Cart from "../cart/Cart";
import Login from "../auth/LoginPage";
import Register from "../auth/RegisterPage";
import CustomersTab from "../admin/Tabs/CustomersTab";
import OrdersTab from "../admin/Tabs/OrdersTab";
import ProductsTab from "../admin/Tabs/ProductsTab";
import ProfilePage from "../account/ProfilePage";
import AccountPage from "../account/Tabs/AccountPage";
import Orders from "../account/Tabs/Orders";
// import LogoutPage from "../auth/LogoutPage";
import ProtectedRoute from "./ProtectedRoute";
import { useState, useEffect } from "react";

function RoutesLayout() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      setAuthenticated(true);
    }
  }, []);

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
            <ProtectedRoute state={isAuthenticated} element={<ProfilePage />} />
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
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/accounts/login" element={<Login />}></Route>
        <Route path="/accounts/signup" element={<Register />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default RoutesLayout;
