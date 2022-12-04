import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon, validateInput } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../store/auth/auth.action";
import { isEmpty } from "lodash";

function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.authSlice);

  const [loading, setLoading] = useState(false);
  const [valueForm, setValueForm] = useState({
    email: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
      authSlice.infoAccount &&
      authSlice.infoAccount.accessToken &&
      authSlice.infoAccount.refreshToken
    ) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  }, [authSlice, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueForm({
      ...valueForm,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newError = {
      email: "",
      password: "",
    };

    const regexEmail =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const infoFieldEmail = validateInput(
      valueForm.email,
      "email",
      0,
      regexEmail
    );
    const infoFieldPassword = validateInput(
      valueForm.password,
      "password",
      0,
      ""
    );

    if (!infoFieldEmail.isValid) {
      isValid = infoFieldEmail.isValid;
      newError.email = infoFieldEmail.message;
    }

    if (!infoFieldPassword.isValid) {
      isValid = infoFieldPassword.isValid;
      newError.password = infoFieldPassword.message;
    }

    if (isValid) {
      setLoading(true);
      const res = await dispatch(loginAdmin(valueForm));
      if (!isEmpty(res.payload)) {
        openNotificationWithIcon("success", "Đăng nhập thành công");
        navigate("/admin/dashboard");
      }
      setErrorForm({ ...newError });
    } else {
      setErrorForm({ ...newError });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="wrapper-auth-admin">
        <div className="form-group form-group-width">
          <Input
            status={errorForm.email.length > 0 ? "error" : ""}
            size="large"
            placeholder="Email"
            allowClear
            onChange={handleChange}
            name="email"
            value={valueForm.email || ""}
          />
          {errorForm.email.length > 0 && (
            <small className="form-error">{errorForm.email}</small>
          )}
        </div>
        <div className="form-group form-group-width">
          <Input.Password
            status={errorForm.password.length > 0 ? "error" : ""}
            size="large"
            placeholder="Mật khẩu"
            allowClear
            onChange={handleChange}
            name="password"
            value={valueForm.password || ""}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
          />
          {errorForm.password.length > 0 && (
            <small className="form-error">{errorForm.password}</small>
          )}
        </div>
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}

export default LoginAdmin;
