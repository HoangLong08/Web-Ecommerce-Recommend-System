const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51M6WndDaFRwojde998fBjs1waIZHxwA9j3ijJLNbvDo2IvVaqepK5at0rcHKhuBrg16r2uhNg9OCGFX2cGz0w3jc002C2nDXTL"
);
// admin
// exports.createCheckoutSession = async (req, res, next) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       success_url: "http://localhost:3000/checkout/payment-success",
//       cancel_url: "http://localhost:3000/cart",
//       line_items: [
//         {
//           price_data: {
//             currency: "vnd",
//             product_data: {
//               name: "Macbook pro 14In",
//               // mages: "",
//               metadata: {
//                 id: 1,
//               },
//             },
//             unit_amount: 2000000,
//           },
//           quantity: 1,
//         },
//         {
//           price_data: {
//             currency: "vnd",
//             product_data: {
//               name: "Macbook pro 16In",
//               // Images: "",
//               metadata: {
//                 id: 2,
//               },
//             },
//             unit_amount: 4000000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//     });

//     console.log("session: ", session);

//     return res.status(200).json({
//       status: "200",
//       msg: "thanh toan thành công",
//       data: session,
//     });
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   }
// };

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { orderId, name, amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      // items: [
      //   {
      //     price_data: {
      //       currency: "vnd",
      //       product_data: {
      //         name: "Macbook pro 14In",
      //         // mages: "",
      //         metadata: {
      //           id: 1,
      //         },
      //       },
      //       unit_amount: 2000000,
      //     },
      //     quantity: 1,
      //   },
      // ],
      // receipt_email: "long@gmail.com",
      amount: amount,
      currency: "vnd",
      metadata: { order_id: orderId },
      description: `order id: ${orderId}, customer: ${name}`,
    });
    res.json({
      status: "200",
      message: "create client_secret successful",
      success: true,
      data: paymentIntent.client_secret,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
