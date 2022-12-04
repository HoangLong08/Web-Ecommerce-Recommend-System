import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import Form from "./Form";
import "./style.css";

const items = [
  { label: "Đăng nhập", key: "1", children: <Form type="login" /> }, // remember to pass the key prop
  { label: "Đăng ký", key: "2", children: <Form type="register" /> },
];

const { TabPane } = Tabs;
function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabKey, setTabKey] = useState("1");
  const pathUrl = location && location.pathname;
  const authSlice = useSelector((state) => state.authSlice);
  console.log("authSlice: ", authSlice);
  useEffect(() => {
    if (
      authSlice.infoAccount &&
      authSlice.infoAccount.accessToken &&
      authSlice.infoAccount.refreshToken
    ) {
      navigate("/");
    }
  }, [authSlice, navigate]);

  useEffect(() => {
    if (pathUrl === "/login" || pathUrl === "/admin/login") {
      setTabKey("1");
    } else {
      setTabKey("2");
    }
  }, [pathUrl]);

  const callback = (key) => {
    setTabKey(key);
    if (key === "2") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container wrapper-auth">
      <div className="auth-header">
        <Link to="/">
          <h1 className="title-logo">LongDev</h1>
        </Link>
        <p>Chào mừng bạn đến với LongDev</p>
      </div>
      <div style={{ marginBottom: "24px" }}>
        <Tabs activeKey={tabKey} onChange={callback} items={items} />
      </div>
    </div>
  );
}

export default Login;
