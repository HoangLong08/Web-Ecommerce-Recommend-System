import { Button, Col, Row, Select, Modal, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useBackToTop from "../../hooks/useBackToTop";
import FormInput from "../../layouts/FormInput";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import axios from "axios";
import payment from "../../api/payment";
import "./style.css";
import { openNotificationWithIcon, validateInput } from "../../utils";
import { addOrderAction } from "../../store/order/order.action";

const { Option } = Select;
const PUBLIC_KEY =
  "pk_test_51M6WndDaFRwojde9sbqGGiAO7aGhEyNVASgFyTCisNQrByNbLwVijggVG8Wso1dEZS0mDhObDsEOnf17vPuaOoBh00kq5KjvZZ";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function CheckOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState("");
  const [isOpenPopupPayment, setIsOpenPopupPayment] = useState(false);
  const shoppingCart = useSelector(
    (state) => state.shoppingCartSlice.shoppingCart
  );

  const [loadingOrder, setLoadingOrder] = useState(false);

  const authSlice = useSelector((state) => state.authSlice);

  const [valueForm, setValueForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [errorForm, setErrorForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  let totalMoney = 0;
  let totalFinalMoney = 0;

  useBackToTop();
  console.log("valueForm: ", valueForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueForm({
      ...valueForm,
      [name]: value,
    });
  };

  const handelPayment = async () => {
    let isValid = true;
    const newError = {
      fullName: "",
      phone: "",
      address: "",
    };
    let infoFieldFullName = validateInput(
      valueForm.fullName,
      "họ và tên",
      0,
      ""
    );
    let infoFieldPhone = validateInput(
      valueForm.phone,
      "số điiện thoại",
      0,
      ""
    );
    let infoFieldAddress = validateInput(valueForm.address, "địa chỉ", 0, "");

    if (!infoFieldFullName.isValid) {
      isValid = infoFieldFullName.isValid;
      newError.fullName = infoFieldFullName.message;
    }

    if (!infoFieldPhone.isValid) {
      isValid = infoFieldPhone.isValid;
      newError.phone = infoFieldPhone.message;
    }

    if (!infoFieldAddress.isValid) {
      isValid = infoFieldAddress.isValid;
      newError.address = infoFieldAddress.message;
    }
    if (isValid) {
      setLoadingOrder(true);
      setIsOpenPopupPayment(!isOpenPopupPayment);

      const resOrder = await dispatch(
        addOrderAction({
          idCustomer: authSlice?.infoAccount?.idUser,
          name: valueForm.fullName,
          phone: valueForm.phone,
          address: valueForm.address,
          note: valueForm.note,
          listProduct: shoppingCart,
        })
      );
      setLoadingOrder(false);
      console.log("resOrder: ", resOrder);
      if (resOrder?.payload?.status === "200") {
        const res = await payment.createSecretIntent(
          "",
          authSlice?.infoAccount?.name,
          totalFinalMoney
        );
        console.log("res: ", res);
        if (res?.status === "200") {
          setClientSecret(res.data);
        }
      } else {
        openNotificationWithIcon("error", "Thanh toán thất bại");
      }
    }

    setErrorForm({ ...newError });
  };

  const handleOk = async () => {
    // e.preventDefault()

    setIsOpenPopupPayment(false);
  };
  const handleCancel = () => {
    setIsOpenPopupPayment(false);
  };

  const renderListCart =
    shoppingCart.length > 0 ? (
      shoppingCart.map((item, index) => {
        totalMoney += item.price * item.quantity;
        return (
          <div className="payment-cart" key={index}>
            <div height="80" width="80" className="payment-cart-img">
              <img alt="product" src={item.thumbnail} loading="lazy" />
            </div>
            <div className="cart-infor">
              <a target="_blank" href={`/dien-thoai/${item.idProduct}`}>
                <div className="payment-cart-name">
                  {item.name}{" "}
                  {item.productOptions && item.productOptions.memory}
                </div>
              </a>
              <div className="payment-cart-number">
                Số lượng: {item.quantity}
              </div>
              <span className="payment-cart-price">
                {item.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        );
      })
    ) : (
      <div>
        <p style={{ textAlign: "center" }}>Giỏ hàng chưa có sản phẩm nào</p>
        <Button className="btn-payment" onClick={() => navigate(`/`)}>
          Hãy mua sắm nào
        </Button>
      </div>
    );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={16} md={16} sm={24} xs={24}>
          <div className="info-delivery commomBackgroundBoder">
            <h3>Thông tin khách hàng</h3>
            <div>
              <FormInput
                title="Họ và tên"
                htmlFor="fullName"
                type=""
                placeholder="Họ và tên"
                name="fullName"
                value={valueForm.fullName || ""}
                onChange={handleChange}
                onKeyDown=""
                className=""
                error={errorForm.fullName}
              />
              <FormInput
                title="Số điện thoại"
                htmlFor="phone"
                type=""
                placeholder="Số điện thoại"
                name="phone"
                value={valueForm.phone || ""}
                onChange={handleChange}
                onKeyDown=""
                className=""
                error={errorForm.phone}
              />
              <FormInput
                title="Địa chỉ"
                htmlFor="address"
                type=""
                placeholder="Địa chỉ"
                name="address"
                value={valueForm.address || ""}
                onChange={handleChange}
                onKeyDown=""
                className=""
                error={errorForm.address}
              />
            </div>
          </div>
          <div className="note-order commomBackgroundBoder">
            <h3>Ghi chú cho đơn hàng</h3>
            <div className="form-group-note">
              <textarea
                type="text"
                name="note"
                value={valueForm.note}
                onChange={handleChange}
                className="form-control"
                placeholder="Nhập thông tin ghi chú cho nhà bán hàng"
              />
            </div>
          </div>
        </Col>
        <Col span={8} md={8} sm={24} xs={24}>
          <div className="infor-order commomBackgroundBoder">
            <h3>Thông tin đơn hàng</h3>
            <div className="list-cart">{renderListCart}</div>
          </div>
          {shoppingCart.length > 0 && (
            <div className="content-payment ppay-ment commomBackgroundBoder">
              <div className="info-payment">
                <div>
                  <p className="title-checkout">Tạm tính</p>
                  <p className="sumary-money">
                    {totalMoney.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div style={{ margin: "8px 0" }}>
                  <p className="title-checkout">Phí vận chuyển</p>
                  <p>
                    {(50000).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <p className="title-checkout">Thành tiền</p>
                  <p className="sumary-money">
                    {(totalFinalMoney = totalMoney + 50000).toLocaleString(
                      "vi",
                      { style: "currency", currency: "VND" }
                    )}
                  </p>
                </div>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    handelPayment();
                  }}
                >
                  Thanh toán ngay
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <Modal
        title="Thanh toán"
        open={isOpenPopupPayment}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
      >
        <Spin spinning={loadingOrder}>
          {stripeTestPromise && clientSecret && (
            <Elements stripe={stripeTestPromise} options={{ clientSecret }}>
              <PaymentForm isOpen={isOpenPopupPayment} />
            </Elements>
          )}
        </Spin>
      </Modal>
    </>
  );
}

export default CheckOut;
