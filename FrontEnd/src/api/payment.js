import authHeader from "../configs/authHeader";
import instance from "../configs/axios";
// import authHeader from 'services/authHeader';

const payment = {
  createSecretIntent(orderId, name, amount) {
    const url = "/stripe/create-payment-intent";
    return instance.post(
      url,
      {
        orderId,
        name,
        amount,
      },
      { headers: authHeader() }
    );
  },
};

export default payment;
