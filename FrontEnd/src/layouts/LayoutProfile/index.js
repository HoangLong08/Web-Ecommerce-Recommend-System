import React from "react";
import Sidebar from "../Sidebar";

import { PieChartOutlined } from "@ant-design/icons";

const arrMenu = [
  {
    icon: <PieChartOutlined />,
    title: "Thông tin cá nhân",
    link: "/profile/personal",
  },
  {
    icon: <PieChartOutlined />,
    title: "Quản lý đơn hàng",
    link: "/profile/orders",
  },
  {
    icon: <PieChartOutlined />,
    title: "Thay đổi mật khẩu",
    link: "/profile/change-password",
  },
];

function LayoutProfile({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar isSidebar={false} type="client" dataMenu={arrMenu} />
      <div style={{ marginLeft: "24px", width: "calc(100% - 240px - 24px)" }}>
        {children}
      </div>
    </div>
  );
}

export default LayoutProfile;
