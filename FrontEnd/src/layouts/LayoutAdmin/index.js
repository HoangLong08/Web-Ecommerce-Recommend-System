import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../Header/admin";
import Sidebar from "../Sidebar";
import { isEmpty } from "lodash";
import {
  // BarChartOutlined,
  TagOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  TeamOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import "./style.css";

const arrMenu = [
  {
    icon: <PieChartOutlined />,
    title: "Bảng điều khiển",
    link: "/admin/dashboard",
  },
  // {
  //   icon: <BarChartOutlined />,
  //   title: "Phân tích",
  //   link: "/admin/analyst",
  // },
  {
    icon: <TagOutlined />,
    title: "Sản phẩm",
    link: "/admin/products",
  },
  {
    icon: <AppstoreOutlined />,
    title: "Thể loại",
    link: "/admin/categories",
  },
  {
    icon: <ContainerOutlined />,
    title: "Đơn hàng",
    link: "/admin/orders",
  },
  {
    icon: <TeamOutlined />,
    title: "Khách hàng",
    link: "/admin/customers",
  },
];

function LayoutAdmin({ children }) {
  const [isSidebar, setIsSidebar] = useState(false);
  const authSlice = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authSlice.infoAccount || !authSlice.infoAccount.accessToken) {
      navigate("/admin/login");
    }
  }, [authSlice, navigate]);

  return (
    <>
      {!isEmpty(authSlice.infoAccount) ? (
        <div className="wrapper-default-layout">
          <Sidebar
            isSidebar={isSidebar}
            onSidebar={setIsSidebar}
            dataMenu={arrMenu}
            type="admin"
          />
          <div
            className={
              isSidebar
                ? "wrapper-content-layout-active"
                : "wrapper-content-layout"
            }
          >
            <HeaderAdmin />
            <div className="wrapper-inner-layout">{children}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default LayoutAdmin;
