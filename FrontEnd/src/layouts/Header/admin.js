import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";
import "./style.css";
import { removeAuth } from "../../store/auth/auth.reducer";

function HeaderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.authSlice);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleLogoutAdmin = () => {
    dispatch(removeAuth({}));
    navigate("/admin/login");
  };

  return (
    <div className="wrapper-header-admin">
      <Link to="/">Xem cửa hàng của bạn</Link>
      <div>
        <Popover
          content={<Button onClick={handleLogoutAdmin}>Đăng xuất</Button>}
          title="Title"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <p className="header-admin-name">{authSlice.infoAccount?.name}</p>
        </Popover>
      </div>
    </div>
  );
}

export default HeaderAdmin;
