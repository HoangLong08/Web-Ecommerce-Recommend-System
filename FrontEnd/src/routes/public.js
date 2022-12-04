import HomePage from "../pages/Home";
import LoginPage from "../pages/Auth/Login";
import ProductPage from "../pages/Product";
import CartPage from "../pages/Cart";
import DetailProductPage from "../pages/DetailProduct";
import SearchPage from "../pages/Search";
import InfoPersonal from "../pages/Profile/InfoPersonal";
import Orders from "../pages/Profile/Orders";
import ChangePassword from "../pages/Profile/ChangePassword";
import CheckOut from "../pages/Checkout";
import PaymentSuccess from "../pages/Checkout/PaymentSuccess";

const publicRoutes = [
  { path: "/", page: HomePage },
  { path: "/login", page: LoginPage, layout: null },
  { path: "/register", page: LoginPage, layout: null },
  { path: "/cart", page: CartPage },
  { path: "/search", page: SearchPage },
  { path: "/:nameProduct", page: DetailProductPage },
  { path: "/category/:nameCategory", page: ProductPage },
  { path: "/profile/personal", page: InfoPersonal },
  { path: "/profile/orders", page: Orders },
  { path: "/profile/change-password", page: ChangePassword },
  { path: "/checkout", page: CheckOut },
  { path: "/checkout/payment-success", page: PaymentSuccess },
];

export { publicRoutes };
