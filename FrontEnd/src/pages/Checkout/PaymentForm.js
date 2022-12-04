import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "antd";
import { openNotificationWithIcon } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

function PaymentForm({ isOpen }) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("here");
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/payment-success",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      openNotificationWithIcon("error", result.error.message);
    } else {
      console.log("result success: ", result);
      if (result?.paymentIntent?.status === "succeeded") {
      }
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <PaymentElement />
        </div>
        <Button type="primary" block onClick={handleSubmit} loading={loading}>
          Pay
        </Button>
      </form>
    </div>
  );
}

export default PaymentForm;
