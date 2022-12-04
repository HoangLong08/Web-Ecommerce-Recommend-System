import React from "react";
import { Link } from "react-router-dom";
import CartProduct from "../../layouts/CartProduct";
import Slider from "react-slick";
import { IconArrowRightSolid } from "../../assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

function FeaturedProduct({
  title,
  linkAllProduct,
  row = 1,
  listProduct,
  link,
}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    rows: row,
  };
  return (
    <div className="wrapper-feature-product">
      <div className="product-list-title d-flex justify-content-space-between align-items-center">
        {linkAllProduct ? (
          <Link to={linkAllProduct} className="feature-title">
            <h2>{title}</h2>
          </Link>
        ) : (
          <div className="feature-title">
            <h2>{title}</h2>
          </div>
        )}
        {linkAllProduct && (
          <Link to={linkAllProduct} className="view-all">
            Xem tất cả
            <IconArrowRightSolid className="view-all-icon-right" />
          </Link>
        )}
      </div>
      <Slider {...settings}>
        {listProduct?.map((item, index) => {
          return (
            <CartProduct
              key={"home-cart-" + index}
              idProduct={item.idProduct}
              thumbnail={item.thumbnail}
              name={item.name}
              price={item.price}
              isDiscount={item.isDiscount}
              discount={item.discount}
              sale={item.sale}
              link={link}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default FeaturedProduct;
