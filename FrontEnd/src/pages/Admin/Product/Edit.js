import { Affix, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetailProductAction,
  updateProductsAdminAction,
} from "../../../store/product/products.action";
import HeadPage from "../components/HeadPage";
import FormProduct from "./Form";
import {
  setAddOption,
  setAddOptionChild,
  setAddSpecifications,
  setBrand,
  setCategory,
  setDeleteImage,
  setDescription,
  setDiscount,
  setImages,
  setInventory,
  setIsDiscountForm,
  setIsOption,
  setName,
  setOptions,
  setPrice,
  setRemoveOptionChild,
  setRemoveSpecifications,
  setSpecifications,
  setThumbnail,
  setValueNameAttr,
  setValueOptionChild,
  setValueSpecifications,
} from "../../../store/product/form.reducer";
import { getAllBrandAdminAction } from "../../../store/brand/brands.action";

function EditProduct() {
  const dispatch = useDispatch();
  let { idProduct } = useParams();
  const [loading, setLoading] = useState(false);
  const productsSlice = useSelector(
    (state) => state.productsSlice.detailProduct
  );
  const infoFormProduct = useSelector((state) => state.formProductsSlice);

  useEffect(() => {
    dispatch(getDetailProductAction({ idProduct }));
  }, [dispatch, idProduct]);

  useEffect(() => {
    const {
      thumbnail,
      images,
      description,
      price,
      specifications,
      name,
      inventory,
      idCategory,
      idBrand,
      isOption,
      options,
      isDiscount,
      discount,
    } = productsSlice.data;
    console.log("productsSlice.data: ", productsSlice.data);
    dispatch(setName(name));
    dispatch(setCategory(idCategory));
    dispatch(getAllBrandAdminAction({ idCategory: idCategory }));
    dispatch(setBrand(idBrand));
    dispatch(setInventory(inventory?.toString()));
    dispatch(setThumbnail(thumbnail));
    dispatch(setImages(images || []));
    dispatch(setIsOption(isOption === 1 ? true : false));
    dispatch(setOptions(options || []));
    dispatch(setSpecifications(specifications || []));
    dispatch(setDescription(description || ""));
  }, [productsSlice, dispatch]);

  const handleSubmit = async () => {
    console.log("info product: ", infoFormProduct);
    const updateProduct = await dispatch(
      updateProductsAdminAction({
        infoFormProduct: infoFormProduct,
        idProduct: idProduct,
      })
    );
  };

  return (
    <>
      <HeadPage
        title="Cập nhật sản phẩm"
        actionMenu={
          <Affix offsetTop={82}>
            <Space>
              <Button type="primary" ghost>
                Xem trước
              </Button>
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                disabled={productsSlice.load}
              >
                Lưu thông tin
              </Button>
            </Space>
          </Affix>
        }
        isBack={1}
      />
      <FormProduct type="edit" />
    </>
  );
}

export default EditProduct;
