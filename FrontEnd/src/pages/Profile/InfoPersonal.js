import React, { useState } from "react";
import { Avatar, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../layouts/FormInput";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import {
  postDetailCustomerAction,
  updateInfoCustomerAction,
} from "../../store/customer/customer.action";
import { openNotificationWithIcon, validateInput } from "../../utils";
import { isEmpty } from "lodash";

function InfoPersonal() {
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice.infoAccount);
  const detailCustomer = useSelector(
    (state) => state.customerSlice.detailCustomer
  );
  console.log("authSlice: ", authSlice);
  const [valueForm, setValue] = useState({
    email: "",
    name: "",
    phone: "",
  });
  console.log("value: ", valueForm);
  const [errorForm, setErrorForm] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(postDetailCustomerAction({ idCustomer: authSlice.idUser }));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setValue({
      avatar: detailCustomer?.data?.avatar,
      email: detailCustomer?.data?.email,
      name: detailCustomer?.data?.name,
      phone: detailCustomer?.data?.phone,
    });
  }, [detailCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...valueForm,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newError = {
      name: "",
      phone: "",
    };
    const infoFieldName = validateInput(valueForm.name, "name", 0, "");
    const infoFieldPhone = validateInput(valueForm.phone, "phone", 0, "");

    if (!infoFieldName.isValid) {
      isValid = infoFieldName.isValid;
      newError.name = infoFieldName.message;
    }

    if (!infoFieldPhone.isValid) {
      isValid = infoFieldPhone.isValid;
      newError.phone = infoFieldPhone.message;
    }

    if (isValid) {
      setLoading(true);
      const res = await dispatch(
        updateInfoCustomerAction({
          ...valueForm,
          idCustomer: authSlice.idUser,
        })
      );
      console.log("!23: ", res);
      if (!isEmpty(res.payload)) {
        openNotificationWithIcon("success", "Cập nhập thành công");
        dispatch(postDetailCustomerAction({ idCustomer: authSlice.idUser }));
      }
      setErrorForm({ ...newError });
    } else {
      setErrorForm({ ...newError });
    }
    setLoading(false);
  };

  return (
    <>
      <h2 style={{ marginBottom: "12px" }}>Thông tin cá nhân</h2>
      <div className="box-ad-page">
        <div className="form-group form-group-width">
          <Avatar
            size={128}
            icon={<UserOutlined />}
            src={valueForm.avatar || ""}
          />
        </div>
        <div className="form-group form-group-width">
          <FormInput
            title="Họ và tên"
            htmlFor="name"
            type=""
            placeholder="Họ và tên"
            name="name"
            value={valueForm.name || ""}
            onChange={handleChange}
            onKeyDown=""
            className=""
            error={errorForm.name}
          />
        </div>
        <div className="form-group form-group-width">
          <FormInput
            title="Email"
            htmlFor="email"
            type=""
            placeholder="Email"
            name="email"
            value={valueForm.email || ""}
            onChange={() => {}}
            onKeyDown=""
            className=""
            error={""}
            disabled
          />
        </div>
        <div className="form-group form-group-width">
          <FormInput
            title="Số điên thoại"
            htmlFor="phone"
            type=""
            placeholder="Số điên thoại"
            name="phone"
            value={valueForm.phone || ""}
            onChange={handleChange}
            onKeyDown=""
            className=""
            error={errorForm.phone}
          />
        </div>
        <div>
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            Cập nhật
          </Button>
        </div>
      </div>
    </>
  );
}

export default InfoPersonal;
