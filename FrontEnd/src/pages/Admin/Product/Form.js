import React, { useEffect, useState } from "react";
import { Select, Checkbox, Space, Button, Spin } from "antd";
import { PlusOutlined, CloseOutlined, RestOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import FormInput from "../../../layouts/FormInput";
import CKeditor from "../../../layouts/CKeditor";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryAdminAction } from "../../../store/category/categories.action";
import { uploadMultiImagesAdminAction } from "../../../store/upload/upload.action";
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
import { getAllBrandAdminAction } from "../../../store/brand/brands.action";
import { setListBrandAdmin } from "../../../store/brand/brands.reducer";

const { Option } = Select;
const regexNumber = /^\d+$/;
const regexCurrency = /^(\d*\.\d{1,2}|\d+)$/;

function FormProduct({ type, idProduct }) {
  const dispatch = useDispatch();
  const listCategoryAdmin = useSelector(
    (state) => state.categoriesSlice.listCategoryAdmin
  );
  const listImages = useSelector((state) => state.formProductsSlice.images);
  const thumbnail = useSelector((state) => state.formProductsSlice.thumbnail);
  const inventory = useSelector((state) => state.formProductsSlice.inventory);
  const price = useSelector((state) => state.formProductsSlice.price);
  const listOption = useSelector((state) => state.formProductsSlice.listOption);
  const discount = useSelector((state) => state.formProductsSlice.discount);
  const name = useSelector((state) => state.formProductsSlice.name);
  const isOption = useSelector((state) => state.formProductsSlice.isOption);
  const description = useSelector(
    (state) => state.formProductsSlice.description
  );
  const specifications = useSelector(
    (state) => state.formProductsSlice.specifications
  );
  const listBrandAdmin = useSelector(
    (state) => state.brandSlice.listBrandAdmin
  );
  const idCategory = useSelector((state) => state.formProductsSlice.category);
  const idBrand = useSelector((state) => state.formProductsSlice.brand);
  const [isDiscount, setIsDiscount] = useState(false); // check the product is discount or not
  const [listCategory, setListCategory] = useState([]); // list category from api
  const [listOnchangeImage, setListOnchangeImage] = useState({}); // handle onChange image when upload images
  const [loading, setLoading] = useState(false);

  const productsSlice = useSelector(
    (state) => state.productsSlice.detailProduct
  );

  useEffect(() => {
    if (type === "edit") {
      dispatch(setDescription(""));
    }
  }, [type, dispatch]);

  useEffect(() => {
    dispatch(
      getAllCategoryAdminAction({
        nameCategory: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setListCategory(listCategoryAdmin.data);
  }, [listCategoryAdmin]);

  useEffect(() => {
    // if the products is not option set the checkbox option blank(tr???ng)
    const findIndexOptionChild = listOption.findIndex(
      (item) => item.listOptionChild.length === 0
    );
    if (listOption.length === 0) {
      dispatch(setIsOption(false));
    }
    if (findIndexOptionChild > -1) {
      dispatch(setRemoveOption(findIndexOptionChild));
    }
  }, [dispatch, listOption]);

  useEffect(() => {
    const findIndexOptionChild = listOption.findIndex(
      (item) => item.listOptionChild.length === 0
    );
    if (findIndexOptionChild > -1) {
      dispatch(setRemoveOption(findIndexOptionChild));
    }
  }, [dispatch, listOption]);

  const onFileChange = (e) => {
    setListOnchangeImage({ imgCollection: e.target.files });
  };

  const onSubmitFile = async () => {
    await setLoading(true);
    let formData = new FormData();
    if (!isEmpty(listOnchangeImage)) {
      for (const key of Object.keys(listOnchangeImage.imgCollection)) {
        formData.append("files", listOnchangeImage.imgCollection[key]);
      }
      try {
        const res = await dispatch(
          uploadMultiImagesAdminAction({ formData: formData })
        );
        if (res.payload.status === 200) {
          dispatch(setImages(res.payload.data));
          dispatch(setThumbnail(res.payload.data?.[0]));
        }
        await setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    }
    await setLoading(false);
    await setListOnchangeImage({});
  };

  return (
    <Spin spinning={productsSlice.load}>
      <div className="box-ad-page box-ad-margin">
        <Space>
          <FormInput
            title="Lo???i s???n ph???m"
            content={
              <Select
                defaultValue="default"
                style={{
                  width: 220,
                }}
                onChange={async (e) => {
                  if (e !== "default") {
                    await dispatch(getAllBrandAdminAction({ idCategory: e }));
                  } else {
                    await dispatch(setListBrandAdmin([]));
                  }
                  await dispatch(setCategory(e));
                  await dispatch(setBrand("default"));
                }}
                name="category"
                value={idCategory}
              >
                <Option value="default">Ch???n lo???i s???n ph???m</Option>
                {listCategory.map((item, index) => {
                  return (
                    <Option
                      key={"item-category-" + index}
                      value={item.idCategory}
                    >
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            }
          />
          <FormInput
            title="H??ng s???n xu???t"
            content={
              <Select
                defaultValue="default"
                style={{
                  width: 220,
                }}
                value={idBrand}
                loading={listBrandAdmin.load}
                onChange={async (e) => {
                  await dispatch(setBrand(e));
                }}
              >
                <Option value="default">Ch???n lo???i s???n ph???m</Option>
                {listBrandAdmin?.data?.map((item, index) => {
                  return (
                    <Option
                      key={"item-brand-" + index}
                      // value={item.idBrand + "-" + item.name}
                      value={item.idBrand}
                    >
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            }
          />
        </Space>
        <FormInput
          title="T??n s???n ph???m"
          htmlFor="nameProduct"
          type=""
          placeholder="T??n s???n ph???m"
          name="nameProduct"
          value={name || ""}
          onChange={(e) => dispatch(setName(e.target.value))}
          onKeyDown=""
          className=""
          error=""
        />
        <FormInput
          title="T???n kho"
          htmlFor="inventory"
          type=""
          placeholder="S??? l?????ng s???n ph???m"
          name="inventory"
          value={inventory || ""}
          onChange={(e) => {
            const { value } = e.target;
            if (regexNumber.test(value)) {
              dispatch(setInventory(value));
            } else {
              dispatch(setInventory(""));
            }
          }}
          onKeyDown=""
          className=""
          error=""
        />
      </div>
      <div className="box-ad-page box-ad-margin">
        <div>
          <FormInput
            title="H??nh ???nh"
            htmlFor="image"
            content={
              <Spin tip="Loading..." spinning={loading}>
                <div className="upload-images-product">
                  <div style={{ width: "300px", display: "flex", gap: "12px" }}>
                    <input
                      type="file"
                      name="imgCollection"
                      onChange={onFileChange}
                      multiple
                      accept="image/*"
                      style={{ marginBottom: "12px" }}
                    />
                    <Button
                      type="primary"
                      onClick={onSubmitFile}
                      disabled={isEmpty(listOnchangeImage)}
                    >
                      Upload
                    </Button>
                  </div>
                  {!isEmpty(thumbnail) ? (
                    <div className="product-thumbnail">
                      <p>Thumbnail</p>
                      <img
                        alt={thumbnail?.name || ""}
                        src={thumbnail?.url || thumbnail}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="list-form-item-image-product">
                    {listImages.map((item, index) => {
                      return (
                        <div
                          key={"item-image-product-" + index}
                          className="form-item-image-product"
                        >
                          <img src={item.url} alt={item.name} />
                          <span
                            style={{
                              lineHeight: "60px",
                              minWidth: "180px",
                              display: "block",
                            }}
                          >
                            {item.name}
                          </span>
                          <div className="form-item-image-product-delete">
                            <Space>
                              <Button
                                size="small"
                                type="primary"
                                onClick={() => dispatch(setThumbnail(item))}
                              >
                                Thumbnail
                              </Button>
                              <Button
                                size="small"
                                type="primary"
                                danger
                                icon={<RestOutlined />}
                                onClick={() => dispatch(setDeleteImage(index))}
                              />
                            </Space>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Spin>
            }
          />
        </div>
      </div>
      <div className="box-ad-page box-ad-margin">
        <Space>
          <FormInput
            content={
              <Checkbox
                onChange={() => {
                  setIsDiscount(!isDiscount);
                  dispatch(setIsDiscountForm(!isDiscount));
                }}
              >
                S???n ph???m gi???m gi?? ( % )
              </Checkbox>
            }
          />
          <FormInput
            content={
              <Checkbox
                onChange={() => {
                  // dispatch(setIsOption(!isOption));
                  dispatch(setIsOption(!isOption));
                  dispatch(
                    setAddOption({
                      nameAttr: "",
                      listOptionChild: [{ nameOption: "", price: "" }],
                    })
                  );
                }}
                checked={isOption}
              >
                S???n ph???m c?? option
              </Checkbox>
            }
          />
        </Space>
        <FormInput
          title="Gi?? s???n ph???m (ch??a t??nh gi???m gi??)"
          placeholder="Gi?? g???c c???a s???n ph???m"
          htmlFor="price"
          type=""
          name="price"
          value={price || ""}
          onChange={(e) => {
            const { value } = e.target;
            if (regexNumber.test(value)) {
              dispatch(setPrice(value));
            } else {
              dispatch(setPrice(""));
            }
          }}
          onKeyDown=""
          className=""
          error=""
        />
        {isOption && ( // product have options
          <FormInput
            title="T??n c???u h??nh (configurations)"
            content={
              <>
                <FormInput
                  title=""
                  content={
                    <Space>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => {
                          dispatch(
                            setAddOption({
                              nameAttr: "",
                              listOptionChild: [{ nameOption: "", price: "" }],
                            })
                          );
                        }}
                      />
                      <p>Th??m c???u h??nh cho s???n ph???m</p>
                    </Space>
                  }
                />
                {listOption.map((item, index) => (
                  <div
                    className="option-product-admin"
                    key={"option-product-admin" + index}
                    style={{ marginLeft: "24px" }}
                  >
                    <Space align="end">
                      <FormInput
                        title="T??n thu???c t??nh"
                        value={item.nameAttr || ""}
                        onChange={(e) => {
                          dispatch(
                            setValueNameAttr({
                              index: index,
                              value: e.target.value,
                            })
                          );
                        }}
                        className="w-300"
                        placeholder="M??u s???c, Dung l?????ng, ...."
                      />
                      <FormInput
                        title=""
                        content={
                          <Button
                            icon={<PlusOutlined />}
                            onClick={() => {
                              dispatch(setAddOptionChild(index));
                            }}
                          />
                        }
                      />
                      <FormInput
                        title=""
                        content={
                          <Button
                            danger
                            icon={<CloseOutlined />}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dispatch(setRemoveOption(index));
                            }}
                          />
                        }
                      />
                    </Space>
                    <div style={{ marginLeft: "24px" }}>
                      <Space align="end" wrap={true}>
                        {item?.listOptionChild?.map((itemChild, indexChild) => (
                          <React.Fragment
                            key={"item-option-child" + indexChild}
                          >
                            <FormInput
                              title="T??n option"
                              value={itemChild.nameOption || ""}
                              onChange={(e) => {
                                dispatch(
                                  setValueOptionChild({
                                    indexAttr: index,
                                    indexOption: indexChild,
                                    valueNameOption: e.target.value,
                                    valuePrice: itemChild.price,
                                  })
                                );
                              }}
                              className="w-300"
                              placeholder="?????, 8GB, ...."
                            />
                            <FormInput
                              title="Gi?? g???c s???n ph???m"
                              value={itemChild.price || ""}
                              onChange={(e) => {
                                const { value } = e.target;
                                if (regexNumber.test(value)) {
                                  // dispatch(setPrice(value));
                                  dispatch(
                                    setValueOptionChild({
                                      indexAttr: index,
                                      indexOption: indexChild,
                                      valueNameOption: itemChild.nameOption,
                                      valuePrice: value,
                                    })
                                  );
                                } else {
                                  dispatch(
                                    setValueOptionChild({
                                      indexAttr: index,
                                      indexOption: indexChild,
                                      valueNameOption: itemChild.nameOption,
                                      valuePrice: "",
                                    })
                                  );
                                }
                              }}
                              className="w-300"
                              placeholder="Gi?? g???c s???n ph???m"
                            />
                            <FormInput
                              title=""
                              content={
                                <Button
                                  danger
                                  icon={<CloseOutlined />}
                                  onClick={() => {
                                    dispatch(
                                      setRemoveOptionChild({
                                        indexOption: index,
                                        indexOptionChild: indexChild,
                                      })
                                    );
                                  }}
                                />
                              }
                            />
                          </React.Fragment>
                        ))}
                      </Space>
                    </div>
                  </div>
                ))}
              </>
            }
          />
        )}
        {isDiscount && ( // check product have discount
          <FormInput
            title="Gi???m gi?? (%)"
            htmlFor=""
            type=""
            placeholder="Gi???m gi?? (%)"
            name=""
            value={discount || ""}
            onChange={(e) => {
              const { value } = e.target;
              if (regexNumber.test(value)) {
                dispatch(setDiscount(e.target.value));
              } else {
                dispatch(setDiscount(""));
              }
            }}
            onKeyDown=""
            className=""
            error=""
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        )}
      </div>
      <div className="box-ad-page box-ad-margin">
        <FormInput
          title="Th??ng s??? k??? thu???t"
          content={
            <>
              <div style={{ marginBottom: "12px" }}>
                <Space>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => {
                      dispatch(
                        setAddSpecifications({
                          label: "",
                          value: "",
                        })
                      );
                    }}
                  />
                  <p>Th??m th??ng s??? k??? thu???t cho s???n ph???m</p>
                </Space>
              </div>
              <Space wrap="true">
                {specifications?.map((item, index) => (
                  <Space
                    align="end"
                    key={"item-specifications-" + index}
                    style={{ marginRight: "24px" }}
                  >
                    <FormInput
                      title="Label"
                      className="w-300"
                      value={item.label || ""}
                      onChange={(e) => {
                        dispatch(
                          setValueSpecifications({
                            indexSpec: index,
                            valueLabel: e.target.value,
                            valueSpec: item.value,
                          })
                        );
                      }}
                      placeholder="B??? nh??? trong, t???n s??? qu??t ...."
                    />
                    <FormInput
                      title="Value"
                      className="w-300"
                      value={item.value || ""}
                      onChange={(e) => {
                        dispatch(
                          setValueSpecifications({
                            indexSpec: index,
                            valueLabel: item.label,
                            valueSpec: e.target.value,
                          })
                        );
                      }}
                      placeholder="32 GB, 60Hz"
                    />
                    <FormInput
                      title=""
                      content={
                        <Button
                          danger
                          icon={<CloseOutlined />}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(setRemoveSpecifications(index));
                          }}
                        />
                      }
                    />
                  </Space>
                ))}
              </Space>
            </>
          }
        />
      </div>
      <div className="box-ad-page box-ad-margin">
        <FormInput
          title="M?? t???"
          content={
            <div style={{ height: "500px", overflow: "auto" }}>
              <CKeditor
                valueEditor={description || ""}
                onChangeEditor={(e) => {
                  dispatch(setDescription(e));
                }}
              />
            </div>
          }
        />
      </div>
    </Spin>
  );
}

export default FormProduct;
