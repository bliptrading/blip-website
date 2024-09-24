import { Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import ProductList from "../product-list/ProductList";
import Footer from "../../components/footer/Footer";
import AdminPage from "../admin/AdminPage";
import DashboardTab from "../admin/Tabs/DashboardTab";
import Login from "../auth/LoginPage";
import Register from "../auth/RegisterPage";
import CustomersTab from "../admin/Tabs/BlogTab";
import OrdersTab from "../admin/Tabs/OrdersTab";
import ProductsTab from "../admin/Tabs/ProductsTab";
import ProfilePage from "../account/ProfilePage";
import AccountPage from "../account/Tabs/AccountPage";
import Orders from "../account/Tabs/Orders";
import ProtectedRoute from "./ProtectedRoute";
import { useState, useEffect } from "react";
import Cart from "../cart/Cart";
import { useLocation } from "react-router-dom";
import AdminLogin from "../admin/AdminLogin";
import AdminProtected from "./AdminProtected";
import NotFound from "../../components/404/NotFound";
import BlogsTab from "../admin/Tabs/BlogTab";
import BlogDetailsPage from "../blog/BlogPage";
import ProductDetails from "../../components/products/ProductDetails/ProductDetails";
import ReviewsPage from "../../components/products/Reviews/ReviewsPage";

function RoutesLayout() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setAuthenticated(!!parsedUser.user.email); 
    } else {
      setAuthenticated(false);
    }
  }, [loc.pathname]); 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":slug" element={<ProductDetails />} />
          <Route path=":slug/reviews" element={<ReviewsPage />} />
          <Route path="category/" element={<ProductList />}>
            <Route path=":category" element={<ProductList />} />
          </Route>
        </Route>
        <Route path="blog/:slug" element={<BlogDetailsPage />} />

        <Route
          path="profile"
          element={
            <ProtectedRoute state={isAuthenticated} path={-1} element={<ProfilePage />} />
          }
        >
          <Route path="settings" element={<AccountPage />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route
          path="/admin"
          element={<AdminProtected state={true} element={<AdminPage />} />}
        >
          <Route path="dashboard" element={<DashboardTab />} />
          <Route path="blog" element={<BlogsTab />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route path="products" element={<ProductsTab />} />
        </Route>
          
        <Route path="/cart" element={<Cart />} />
        <Route path="/accounts/login" element={<Login />} />
        <Route path="/accounts/signup" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default RoutesLayout;
