import React, { useEffect, useState } from "react";
import { Affix, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import HeadPage from "../components/HeadPage";
import FormProduct from "./Form";
import { addProductsAdminAction } from "../../../store/product/products.action";
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
  setRemoveOption,
  setRemoveOptionChild,
  setRemoveSpecifications,
  setSpecifications,
  setThumbnail,
  setValueNameAttr,
  setValueOptionChild,
  setValueSpecifications,
} from "../../../store/product/form.reducer";

function AddProduct() {
  const dispatch = useDispatch();
  const infoForm = useSelector((state) => state.formProductsSlice);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setName(""));
    dispatch(setCategory("default"));
    dispatch(setBrand("default"));
    dispatch(setInventory(""));
    dispatch(setThumbnail({}));
    dispatch(setImages([]));
    dispatch(setOptions([]));
    dispatch(setSpecifications([]));
    dispatch(setDescription(""));
  }, []);

  const handleSubmit = async () => {
    const { name } = infoForm;
    setLoading(true);
    await dispatch(
      addProductsAdminAction({
        info: infoForm,
      })
    );
    setLoading(false);
  };

  return (
    <>
      <HeadPage
        title="Thêm sản phẩm"
        actionMenu={
          <Affix offsetTop={82}>
            <Space>
              <Button type="primary" ghost>
                Xem trước
              </Button>
              <Button type="primary" onClick={handleSubmit} loading={loading}>
                Lưu thông tin
              </Button>
            </Space>
          </Affix>
        }
        isBack={1}
      />
      <FormProduct type="add" />
    </>
  );
}

export default AddProduct;
