import { Button } from "antd";
import { RestOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useBackToTop from "../../hooks/useBackToTop";
import {
  removeAllProductInShoppingCart,
  removeProductInShoppingCart,
} from "../../store/shoppingCart/shoppingCart.reducer";
import { formatCash } from "../../utils";
import "./style.css";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shoppingCart = useSelector(
    (state) => state.shoppingCartSlice.shoppingCart
  );
  console.log("shoppingCart: ", shoppingCart);
  useBackToTop();
  return (
    <div className="wrapper-cart-page">
      <div className="cart-left">
        <div className="cart-header">
          <p className="cart-page-title">Giỏ hàng</p>
          {shoppingCart.length > 0 && (
            <Button
              type="link"
              onClick={() => dispatch(removeAllProductInShoppingCart([]))}
            >
              Xóa tất cả
            </Button>
          )}
        </div>
        <div className="list-cart">
          {shoppingCart.length === 0 && (
            <>
              <span>Chưa có sản phẩm nào trong giỏ hàng</span>
              <Button type="link" onClick={() => navigate("/")}>
                Mua hàng ngay
              </Button>
            </>
          )}
          {shoppingCart.length > 0 &&
            shoppingCart?.map((item, index) => (
              <div className="page-cart-item" key={"page-cart-item" + index}>
                <div className="cart-item-image">
                  <img src={item.thumbnail} alt="" />
                </div>
                <div className="cart-item-info-detail">
                  <Link to="/">
                    <p className="cart-item-name">{item.name}</p>
                  </Link>
                  <div className="cart-item-price">
                    <p className="sale-price">{formatCash(item.price)}</p>
                    {item.discount > 0 && (
                      <>
                        <p className="regular-price">
                          {formatCash(
                            (item.price * (100 - item.discount)) / 100
                          )}
                        </p>
                        <span className="on-sale">Giảm {item.discount} %</span>
                      </>
                    )}
                  </div>
                  <div className="change-quantity">
                    <p>Số lượng</p>
                    <div className="number">
                      <span className="minus">-</span>
                      <input
                        type="text"
                        readOnly="readOnly"
                        value={item.quantity || 1}
                      />
                      <span data-v-5cf7d568="" className="plus">
                        +
                      </span>
                    </div>
                  </div>
                  <div className="promotion-pack"></div>
                  <div className="wrapper-btn-delete-cart">
                    <Button
                      danger
                      icon={<RestOutlined />}
                      onClick={() =>
                        dispatch(removeProductInShoppingCart(index))
                      }
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="cart-right">
        <div className="cart-header cart-header-right">
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
        </div>
        {shoppingCart.length > 0 && (
          <>
            {/* <div className="wrapper-cart-coupon">
              <h6 className="title-box-cart-page">Khuyến mại</h6>
              <div className="container-cart-coupon">
                <Search
                  placeholder="Mã giảm giá"
                  allowClear
                  enterButton="Áp dụng"
                  size="large"
                  onSearch={onSearch}
                />
              </div>
            </div> */}
            <div className="wrapper-cart-coupon">
              <h6 className="title-box-cart-page">Thanh toán</h6>
              <div className="cart-page-money">
                <p>Thành tiền</p>
                <p className="cart-main-money">90000000</p>
              </div>
              <Button
                type="primary"
                block
                style={{ marginBottom: "12px" }}
                onClick={() => navigate("/checkout")}
              >
                Tiến hành đặt hàng
              </Button>
              <Button block onClick={() => navigate("/")}>
                Chọn thêm sản phẩm
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
