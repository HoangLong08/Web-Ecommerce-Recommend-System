import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate, Row, Col, Button, Spin } from "antd";
import ImageMagnifier from "./ImageMagnifier";
import ItemVariant from "./ItemVariant";
import FeaturedProduct from "../Home/FeaturedProduct";
import { getDetailProductAction } from "../../store/product/products.action";
import { formatCash, openNotificationWithIcon } from "../../utils";
import useBackToTop from "../../hooks/useBackToTop";
import { addProductInShoppingCart } from "../../store/shoppingCart/shoppingCart.reducer";
import { setThumbnail } from "../../store/product/products.reducer";
import Evaluate from "./Evaluate";
import "./style.css";
import { isEmpty } from "lodash";
import { getProductsSimilarAction } from "../../store/rs/rs.action";

const getQueryParams = (query) =>
  window.location.search
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

function DetailProduct() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const paramFromUrl = getQueryParams(location.search); // get query params from url

  const [idProduct, setIdProduct] = useState(paramFromUrl.id);
  const [optionActive, setOptionActive] = useState([]); // save the first option of product
  const [detailProduct, setDetailProduct] = useState({});

  const productsSlice = useSelector(
    (state) => state.productsSlice.detailProduct
  );
  const thumbnailDetail = useSelector((state) => state.productsSlice.thumbnail);
  const productSimilar = useSelector(
    (state) => state.rsSlice.listProductSimilar
  );
  console.log("productSimilar: ", productSimilar);

  useBackToTop();

  useEffect(() => {
    setIdProduct(paramFromUrl.id);
  }, [paramFromUrl]);

  useEffect(() => {
    dispatch(getDetailProductAction({ idProduct }));
  }, [dispatch, idProduct]);

  useEffect(() => {
    setDetailProduct(productsSlice?.data);
    dispatch(setThumbnail(productsSlice?.data?.thumbnail));
  }, [productsSlice, dispatch]);

  useEffect(() => {
    // handle when first page load get first option
    if (productsSlice?.data) {
      let newArr = [];
      productsSlice?.data?.options?.forEach((el) => {
        el?.attribute?.forEach((itemAttribute) => {
          let obj = {};
          if (el?.attribute?.[0]?.idAttribute === itemAttribute.idAttribute) {
            obj = {
              ...itemAttribute,
              idOption: el.idOption,
              active: true,
            };
          } else {
            obj = {
              ...itemAttribute,
              idOption: el.idOption,
              active: false,
            };
          }
          newArr.push(obj);
        });
      });
      setOptionActive(newArr);
    }
  }, [productsSlice.data]);

  useEffect(() => {
    if (!isEmpty(productsSlice.data)) {
      let specs = productsSlice.data?.specifications?.map((item) => item.value);
      dispatch(getProductsSimilarAction({ specs, idProduct: idProduct }));
    }
  }, [productsSlice.data, dispatch, idProduct]);

  const createMarkup = (_des) => {
    return { __html: _des };
  };

  const handleAddShoppingCart = () => {
    let infoProduct = {};
    const { idProduct, name, price, discount, thumbnail } = detailProduct;
    if (detailProduct?.isOption) {
      infoProduct = {
        idProduct: idProduct,
        name: name,
        price: price,
        thumbnail: thumbnail,
        discount: discount,
        options: optionActive.filter((el) => el.active === true),
      };
    } else {
      infoProduct = {
        idProduct: idProduct,
        name: name,
        price: price,
        discount: discount,
        thumbnail: thumbnail,
      };
    }
    dispatch(addProductInShoppingCart(infoProduct));
    openNotificationWithIcon("success", "Thêm vào giỏ hàng thành công");
  };

  return (
    <Spin spinning={productsSlice.load}>
      {detailProduct.idProduct ? (
        <div className="wrapper-detail-product">
          <div className="detail-product-header">
            <div className="detail-product-name">
              <h1>{detailProduct.name}</h1>
            </div>
            <div className="detail-product-rate">
              <Rate defaultValue={3} disabled style={{ color: "#f59e0b" }} />
              <p className="detail-product-number-evaluate">36 đánh giá</p>
            </div>
          </div>
          <hr className="detail-product-line" />
          <Row gutter={[16, 16]}>
            <Col sm={18}>
              <div className="detail-product-box">
                <Row gutter={[16, 16]}>
                  <Col sm={14}>
                    <div>
                      <div className="detail-product-thumbnail">
                        <ImageMagnifier width={"100%"} src={thumbnailDetail} />
                      </div>
                    </div>
                    <div className="detail-product-list-image-small">
                      {detailProduct?.images?.map((item, index) => (
                        <div
                          className="detail-product-image-small"
                          key={"item-detail-product-image-" + index}
                          onClick={() => dispatch(setThumbnail(item.url))}
                        >
                          <img src={item.url} alt="" />
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col sm={10}>
                    <div className="detail-product-price">
                      <p className="detail-product-price-show">
                        {formatCash(
                          (detailProduct.price *
                            (100 - detailProduct.discount)) /
                            100
                        )}
                      </p>
                      {detailProduct.isDiscount === 1 ? (
                        <p className="detail-product-price-through">
                          {formatCash(detailProduct.price)}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                    {detailProduct?.options?.map((item, index) => {
                      return (
                        <div key={"item-variant-" + index}>
                          <p className="item-variant-name-option">
                            {item.nameOption}
                          </p>
                          <div className="detail-product-list-variant">
                            {item?.attribute?.map(
                              (itemAttribute, indexAttribute) => {
                                let filterActive = optionActive?.filter(
                                  // filter list active : true in list option
                                  (el) => el.active === true
                                );
                                return (
                                  <ItemVariant
                                    key={
                                      "item-variant-nameAttribute-" +
                                      indexAttribute
                                    }
                                    title={itemAttribute.nameAttribute}
                                    price={itemAttribute.priceAttribute}
                                    active={
                                      filterActive.findIndex(
                                        (itemFind) =>
                                          itemFind?.idAttribute ===
                                          itemAttribute.idAttribute
                                      ) > -1
                                        ? true
                                        : false
                                    }
                                    handleClick={() => {
                                      setOptionActive((state) => {
                                        return state.map((itemState) => {
                                          if (
                                            itemAttribute.idAttribute ===
                                              itemState.idAttribute &&
                                            itemState.idOption === item.idOption
                                          ) {
                                            return {
                                              ...itemState,
                                              active: true,
                                            };
                                          } else if (
                                            itemAttribute.idAttribute !==
                                              itemState.idAttribute &&
                                            itemState.idOption === item.idOption
                                          ) {
                                            return {
                                              ...itemState,
                                              active: false,
                                            };
                                          }
                                          return itemState;
                                        });
                                      });
                                    }}
                                  />
                                );
                              }
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <Row gutter={[16, 16]}>
                      <Col sm={24}>
                        <Button block onClick={handleAddShoppingCart}>
                          Thêm vào hàng
                        </Button>
                      </Col>
                      <Col sm={24}>
                        <Button
                          block
                          type="primary"
                          onClick={() => {
                            handleAddShoppingCart();
                            navigate("/cart");
                          }}
                        >
                          Mua ngay
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm={6}>
              <div className="box-warranty-info">
                <div className="detail-product-title">Thông tin sản phẩm</div>
                <p>
                  Máy mới 100% , chính hãng Apple Việt Nam. CellphoneS hiện là
                  đại lý bán lẻ uỷ quyền iPhone chính hãng VN/A của Apple Việt
                  Nam
                </p>
                <p>
                  1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo
                  hành 12 tháng tại trung tâm bảo hành chính hãng
                </p>
              </div>
            </Col>
          </Row>
          <FeaturedProduct
            title="Sản phẩm tương tự"
            listProduct={productSimilar.data}
          />
          <Row gutter={[16, 16]}>
            <Col sm={16}>
              <div className="detail-product-box">
                <p className="detail-product-title">Mô tả sản phẩm</p>
                {detailProduct.description.length > 0 ? (
                  <div
                    className="detail-product-block-content"
                    dangerouslySetInnerHTML={createMarkup(
                      detailProduct.description
                    )}
                  />
                ) : (
                  <p>Đang cập nhật</p>
                )}
              </div>
            </Col>
            <Col sm={8}>
              <div className="detail-product-box">
                <p className="detail-product-title">Thông số kỹ thuật</p>
                <div className="detail-product-technical-content">
                  {detailProduct?.specifications?.length === 0 && (
                    <p>Đang cập nhật</p>
                  )}
                  {detailProduct?.specifications?.length > 0 &&
                    detailProduct?.specifications?.map((item, index) => {
                      return (
                        <div
                          className="technical-content-item"
                          key={"item-specifications-" + index}
                        >
                          <p className="technical-content-item-label">
                            {item.label}
                          </p>
                          <p className="technical-content-item-value">
                            {item.value}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Col>
          </Row>
          <div className="detail-product-box" style={{ marginTop: "16px" }}>
            <Evaluate />
          </div>
        </div>
      ) : (
        <div style={{ height: "100vh" }}></div>
      )}
    </Spin>
  );
}

export default DetailProduct;
