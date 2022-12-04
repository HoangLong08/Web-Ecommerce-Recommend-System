import { Button } from "antd";
import React from "react";
import FormInput from "../../layouts/FormInput";

function ChangePassword() {
  return (
    <>
      <h2 style={{ marginBottom: "12px" }}>Thay đổi mật khẩu</h2>
      <div className="box-ad-page">
        <div className="form-group form-group-width">
          <FormInput
            title="Mật khẩu cũ"
            htmlFor="nameProduct"
            type=""
            placeholder="Mật khẩu cũ"
            name="nameProduct"
            value={""}
            onChange={() => {}}
            onKeyDown=""
            className=""
            error=""
          />
        </div>
        <div className="form-group form-group-width">
          <FormInput
            title="Mật khẩu mới "
            htmlFor="nameProduct"
            type=""
            placeholder="Mật khẩu mới"
            name="nameProduct"
            value={""}
            onChange={() => {}}
            onKeyDown=""
            className=""
            error=""
          />
        </div>
        <div className="form-group form-group-width">
          <FormInput
            title="Xác nhận mật khẩu"
            htmlFor="nameProduct"
            type=""
            placeholder="Xác nhận mật khẩu"
            name="nameProduct"
            value={""}
            onChange={() => {}}
            onKeyDown=""
            className=""
            error=""
          />
        </div>
        <div>
          <Button type="primary">Cập nhật</Button>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
