import { Button, Input, Space } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import HeadPage from "../components/HeadPage";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import TableAntd from "../components/Table";

const columns = [
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

function Customer() {
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
      <HeadPage title="Khách hàng" actionMenu={<></>} isBack={0} />
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

export default Customer;
