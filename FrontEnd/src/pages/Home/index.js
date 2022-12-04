import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../store/product/products.action";
import { getProductRatingSimilarAction } from "../../store/rs/rs.action";
import Banner from "./Banner";
import FeaturedProduct from "./FeaturedProduct";

function HomePage() {
  const dispatch = useDispatch();
  const productsSlice = useSelector((state) => state.productsSlice.listProduct);
  const authSlice = useSelector((state) => state.authSlice);
  const productSimilar = useSelector(
    (state) => state.rsSlice.listProductRatingSimilar
  );
  console.log("productSimilar: ", productSimilar?.data);
  console.log("authSlice: ", authSlice);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  useEffect(() => {
    if (
      authSlice.infoAccount &&
      authSlice.infoAccount.accessToken &&
      authSlice.infoAccount.idUser
    ) {
      console.log("123");
      dispatch(
        getProductRatingSimilarAction({
          idCustomer: authSlice.infoAccount.idUser,
        })
      );
    }
  }, [authSlice, dispatch]);

  useEffect(() => {
    setListProduct(productsSlice?.data);
  }, [productsSlice]);

  return (
    <div>
      <Banner />
      {authSlice?.infoAccount?.accessToken && (
        <Spin spinning={productSimilar.load}>
          <FeaturedProduct
            title="Gợi ý sản phẩm cho bạn"
            listProduct={productSimilar?.data}
            row={2}
          />
        </Spin>
      )}
      <FeaturedProduct
        title="Điện thoại nổi bật"
        linkAllProduct="/category/mobile"
        link="dien-thoai"
        listProduct={listProduct}
      />
      <FeaturedProduct
        title="Lap top"
        linkAllProduct="/category/laptop"
        link="laptop"
        listProduct={listProduct}
      />
      <FeaturedProduct
        title="Màn hình, máy tính để bàn "
        linkAllProduct="/category/man-hinh"
        link="man-hinh"
        listProduct={listProduct}
      />
    </div>
  );
}

export default HomePage;
