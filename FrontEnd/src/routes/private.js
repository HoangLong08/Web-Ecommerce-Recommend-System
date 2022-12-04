import LoginAdmin from "../pages/Auth/LoginAdmin";
import Dashboard from "../pages/Admin/Dashboard";
import Analyst from "../pages/Admin/Analyst";
import Product from "../pages/Admin/Product";
import AddProduct from "../pages/Admin/Product/Add";
import EditProduct from "../pages/Admin/Product/Edit";
import Category from "../pages/Admin/Category";

import Order from "../pages/Admin/Order";
import Customer from "../pages/Admin/Customer";

const privateRoutes = [
  { path: "/admin/login", component: LoginAdmin, layout: null },
  { path: "/admin/dashboard", component: Dashboard },
  { path: "/admin/analyst", component: Analyst },
  { path: "/admin/products", component: Product },
  { path: "/admin/products/add-product", component: AddProduct },
  { path: "/admin/products/edit-product/:idProduct", component: EditProduct },
  { path: "/admin/categories", component: Category },
  { path: "/admin/orders", component: Order },
  { path: "/admin/customers", component: Customer },
];

export { privateRoutes };
