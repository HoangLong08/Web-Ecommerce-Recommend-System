const express = require("express");
// const bodyParser = require("body-parser");
const db = require("./app/utils/database");
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const productRouter = require("./app/routes/product.route");
const authRouter = require("./app/routes/auth.route");
const categoryRouter = require("./app/routes/category.route");
const brandRouter = require("./app/routes/brand.route");
const uploadRouter = require("./app/routes/upload.route");
const errorController = require("./app/controllers/error");
const addressRouter = require("./app/routes/address.route");
const evaluateRouter = require("./app/routes/evaluates.route");
const customerRouter = require("./app/routes/customer.route");
const paymentRouter = require("./app/routes/payment.route");
const orderRouter = require("./app/routes/order.route");

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*',);
  const allowedOrigins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:9000",
    "http://localhost:9000",
  ];
  const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  // 	res.setHeader('Access-Control-Allow-Origin', origin);
  // }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, Origin, X-Requested-With"
  );
  next();
});

app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/evaluates", evaluateRouter);
app.use("/uploads", uploadRouter);
app.use("/address", addressRouter);
app.use("/customers", customerRouter);
app.use("/stripe", paymentRouter);
app.use("/orders", orderRouter);
app.use(`/images`, express.static(__dirname + "/app/uploads")); // public images

app.use(errorController.get404);
app.use(errorController.get500);

// process.on("unhandledRejection", (error) => {
//   // Will print "unhandledRejection err is not defined"
//   console.log("unhandledRejection", error.message);
// });

app.listen(5000, () => console.log("express server is running"));
