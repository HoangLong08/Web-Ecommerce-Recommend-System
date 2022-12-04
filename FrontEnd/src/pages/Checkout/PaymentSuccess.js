import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllProductInShoppingCart } from "../../store/shoppingCart/shoppingCart.reducer";
import "./style.css";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (
      !authSlice.infoAccount ||
      !authSlice.infoAccount.accessToken ||
      !authSlice.infoAccount.idUser
    ) {
      navigate("/login");
    }
  }, [authSlice, navigate]);

  useEffect(() => {
    dispatch(removeAllProductInShoppingCart([]));
  }, [dispatch]);

  return (
    <div>
      <div className="wrap-payment-success">
        <div className="icon-payment-success">
          <i className="far fa-check-circle"></i>
        </div>
        <h1>Đặt hàng thành công</h1>
        <div>
          Cảm ơn bạn đã mua hàng tại:{" "}
          <p className="text-payment-success">LongDev</p>
        </div>
        <Button type="primary" onClick={() => navigate(`/`)}>
          Tiếp mua sắm{" "}
        </Button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
