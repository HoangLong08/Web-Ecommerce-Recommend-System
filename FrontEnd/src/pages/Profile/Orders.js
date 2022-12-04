import { Button, Space } from "antd";
import React from "react";
import { formatCash } from "../../utils";
import TableAntd from "../Admin/components/Table";

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "idOrder",
    key: "idOrder",
  },
  {
    title: "Ngày mua",
    dataIndex: "purchaseDate",
    key: "purchaseDate",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
    key: "product",
    width: 300,
  },
  {
    title: "Tổng tiền",
    dataIndex: "sumMoney",
    key: "sumMoney",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
];

function Orders() {
  const renderDataSource = () => {
    return []?.map((item, index) => {
      return {
        key: index,
        idOrder: item.nameProduct,
        purchaseDate: "",
        product: item.nameCategory,
        sumMoney: formatCash((item.price * (100 - 0)) / 100),
        status: item.discount,
      };
    });
  };
  return (
    <>
      <h2 style={{ marginBottom: "12px" }}>Quản lý đơn hàng</h2>
      <div className="box-ad-page">
        <TableAntd
          data={renderDataSource()}
          tableHead={columns}
          loading={true}
        />
      </div>
    </>
  );
}

export default Orders;
