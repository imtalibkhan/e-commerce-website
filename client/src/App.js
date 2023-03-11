import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";
import Users from "./pages/Admin/Users";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Productss from "./pages/Admin/Productss";
import UpdateProduct from "./pages/Admin/UpdaetProduct";
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/category/:slug" element={<CategoryProduct />} />




        <Route path="/search" element={<Search />} />


        {/* nested route proted route  users*/}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        {/* admin route */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />

          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route
            path="admin/products/:slug"
            element={<UpdateProduct />}
          />

          <Route path="admin/productss" element={<Productss />} />

          <Route path="admin/create-users" element={<Users />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/login" element={<Login />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
