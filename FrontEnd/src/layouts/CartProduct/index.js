import React from "react";
import { Link } from "react-router-dom";
import { formatCash } from "../../utils";
import "./discount.css";
import "./style.css";

function CartProduct({
  idProduct,
  name,
  thumbnail,
  price,
  sale,
  isDiscount,
  discount,
  numberEvaluate,
  className,
  link,
}) {
  return (
    <div className={"product-info-container " + className}>
      <div className="product-info">
        <Link to={`/${link}?id=${idProduct}`}>
          <div className="product-image">
            <img src={thumbnail} alt={name} />
          </div>
          <div className="product-name">
            <h3>{name}</h3>
          </div>
          <div className="product-price">
            <p className="product-price-show">
              {formatCash((price * (100 - discount)) / 100)}
            </p>
            {isDiscount === 1 ? (
              <p className="product-price-through">{formatCash(price)}</p>
            ) : (
              <></>
            )}
          </div>
          {isDiscount ? (
            <div className="product-price-percent">
              <span className="flag-discount">Giảm {discount}%</span>
            </div>
          ) : (
            <></>
          )}
        </Link>
      </div>
    </div>
  );
}

export default CartProduct;
