import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartProduct from "../../layouts/CartProduct";
import { getAllProductByCategoryAction } from "../../store/product/products.action";
import ItemFilter from "./ItemFilter";
import "./style.css";

const standard = [
  {
    nameCategory: "mobile",
    des: [
      {
        title: "Sẵn hàng",
        content: [],
      },
      {
        title: "Giá",
        content: [],
      },
      {
        title: "Loại điện thoại",
        content: ["Android", "Iphone"],
      },
      {
        title: "Tính năng camera",
        content: [
          "Chụp xóa phông",
          "Chụp góc rộng",
          "Quay video 4K",
          "Chụp zoom xa",
          "Chụp Macro",
          "Chống rung",
        ],
      },
      {
        title: "Tính năng đặc biệt",
        content: [
          "Sạc không dây",
          "Bảo mật vân tay",
          "Nhận diện khuôn mặt",
          "Kháng nước, kháng bụi",
          "Hỗ trợ 5G",
        ],
      },
      {
        title: "Dung lượng RAM",
        content: ["Dưới 4GB", "4GB-6GB", "8GB-12GB", "12GB trở lên"],
      },
      {
        title: "Bộ nhớ trong",
        content: ["Dưới 32GB", "32GB và 64GB", "128GB và 256GB", "Trên 512GB"],
      },
      {
        title: "Kiểu màn hình",
        content: [
          "Tai thỏ",
          "Tràn viền",
          "Màn hình gập",
          "Giọt nước",
          "Đục lỗ",
        ],
      },
      {
        title: "Tần số quét",
        content: ["60Hz", "120Hz", "90Hz", "144Hz"],
      },
      {
        title: "Kích thước màn hình",
        content: ["Trên 6 inch", "Dưới 6 inch"],
      },
      {
        title: "Nhu cầu sử dụng",
        content: [
          "Chơi game",
          "Pin trâu",
          "Dung lượng lớn",
          "Cấu hình cao",
          "Mỏng nhẹ",
          "Chụp ảnh đẹp",
          "Nhỏ gọn, dễ cầm nắm",
        ],
      },
    ],
  },
];

const sortProduct = ["Giá Cao-Thấp", "Giá Thấp - Cao", "Xem nhiều"];

function Product() {
  const { nameCategory } = useParams();
  const dispatch = useDispatch();

  const listProductByNameUrl = useSelector(
    (state) => state.productsSlice.listProductByNameUrl
  );
  console.log("listProductByNameUrl: ", listProductByNameUrl);

  useEffect(() => {
    dispatch(
      getAllProductByCategoryAction({
        nameUrl: nameCategory === "mobile" ? "dien-thoai" : "laptop",
      })
    );
  }, []);

  return (
    <Spin spinning={listProductByNameUrl.load}>
      <p className="filter-sort-title">Chọn theo tiêu chí</p>
      <div className="filter-sort-list">
        {standard[0].des.map((item, index) => {
          return (
            <ItemFilter
              title={item.title}
              key={"item-standard-" + index}
              content={item.content}
            />
          );
        })}
      </div>
      <div className="filter-sort-list"></div>

      <p className="filter-sort-title">Sắp xếp theo</p>
      <div className="filter-sort-list">
        {sortProduct.map((item, index) => {
          return <ItemFilter title={item} key={"item-sort-" + index} />;
        })}
      </div>
      <div className="product-list-filter">
        {listProductByNameUrl?.data?.map((item, index) => {
          return (
            <CartProduct
              key={"product-cart-" + index}
              idProduct={item.idProduct}
              thumbnail={item.thumbnail}
              name={item.name}
              price={item.price}
              isDiscount={item.isDiscount}
              discount={item.discount}
              sale={item.sale}
              className="product-item"
            />
          );
        })}
      </div>
    </Spin>
  );
}

export default Product;
