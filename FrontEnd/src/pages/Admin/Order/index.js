import { Button, Input, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import HeadPage from "../components/HeadPage";
import TableAntd from "../components/Table";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "orderID",
    key: "orderID",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Thời gian đặt hàng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

function Order() {
  const navigate = useNavigate();
  const renderDataSource = () => {
    return [].map((item, index) => {
      return {
        key: index,
        title: item.name,
        action: (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                navigate(`/admin/products/edit-product/${item.idCategory}`)
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
      <HeadPage title="Order" actionMenu={<></>} isBack={0} />
      <div className="box-ad-page wrapper-box-admin-page">
        <div className="wrapper-filter-page-admin">
          <div className="container-filter-page-admin-left">
            <div>
              <Input
                placeholder="Tìm kiếm tên đơn hàng"
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
          loading={false}
        />
      </div>
    </div>
  );
}

export default Order;
