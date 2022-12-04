import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space, Input } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import HeadPage from "../components/HeadPage";
import TableAntd from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAdminAction } from "../../../store/product/products.action";
import { formatCash } from "../../../utils";
import "./style.css";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Giá gốc",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Loại sản phẩm",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Nhà sản xuất",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Giảm giá (%)",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Tồn kho",
    dataIndex: "inventory",
    key: "inventory",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 120,
  },
];

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProductAdmin = useSelector(
    (state) => state.productsSlice.listProductAdmin
  );
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    dispatch(getAllProductsAdminAction());
  }, [dispatch]);

  useEffect(() => {
    setListProduct(listProductAdmin?.data);
  }, [listProductAdmin]);

  const renderDataSource = () => {
    return listProduct?.map((item, index) => {
      return {
        key: index,
        name: item.nameProduct,
        price: formatCash((item.price * (100 - 0)) / 100),
        category: item.nameCategory,
        brand: item.nameBrand,
        discount: item.discount,
        inventory: item.inventory,
        action: (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                navigate(`/admin/products/edit-product/${item.idProduct}`)
              }
            />
            <Button icon={<DeleteOutlined />} danger />
          </Space>
        ),
      };
    });
  };

  return (
    <div>
      <HeadPage
        title="Sản phẩm"
        actionMenu={
          <Space>
            <Button type="link">Nhập</Button>
            <Button type="link">Xuất</Button>
            <Button
              type="primary"
              onClick={() => {
                navigate("/admin/products/add-product");
              }}
            >
              Thêm sản phẩm
            </Button>
          </Space>
        }
        isBack={0}
      />
      <div className="box-ad-page wrapper-box-admin-page">
        <div className="wrapper-filter-page-admin">
          <div className="container-filter-page-admin-left">
            <div>
              <Input
                placeholder="Tìm kiếm tên sản phẩm"
                prefix={<SearchOutlined />}
                style={{ width: "300px" }}
              />
            </div>
          </div>
          <div className="container-filter-page-admin-right">
            <div>
              <Button>Sắp xếp</Button>
            </div>
          </div>
        </div>
        <TableAntd
          data={renderDataSource()}
          tableHead={columns}
          loading={listProductAdmin.load}
        />
      </div>
    </div>
  );
}

export default Product;
