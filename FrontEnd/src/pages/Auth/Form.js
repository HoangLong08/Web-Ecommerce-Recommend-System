import React, { useState, useEffect } from "react";

import { Input, Button, Space, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { loginAction, loginWithGoogleAction, registerAction } from 'store/auth/actions';
import "./progressBar.css";
import { IconFacebook, IconGoogle } from "../../assets";
import { openNotificationWithIcon, validateInput } from "../../utils";
import {
  getAllCityAction,
  getListDistrictByIdCityAction,
  getListStreetByIdDistrictAction,
} from "../../store/address/address.action";
import {
  setListDistrict,
  setListStreet,
} from "../../store/address/address.reducer";
import { loginUser, registerUser } from "../../store/auth/auth.action";

const { Option } = Select;

function Form({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listCity = useSelector((state) => state.addressSlice.listCity);
  const listDistrict = useSelector((state) => state.addressSlice.listDistrict);
  const listStreet = useSelector((state) => state.addressSlice.listStreet);

  const [loading, setLoading] = useState(false);
  const [valueCity, setValueCity] = useState("defaultCity");
  const [valueDistrict, setValueDistrict] = useState("defaultDistrict");
  const [valueStreet, setValueStreet] = useState("defaultStreet");

  const [loadingSignInWithIcon, setLoadingSignInWithIcon] = useState(false);

  const [valueForm, setValueForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [errorForm, setErrorForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(getAllCityAction());
  }, [dispatch]);

  useEffect(
    () => () =>
      setValueForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }),
    []
  );

  const handleSubmit = async () => {
    let isValid = true;
    const newError = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const regexEmail =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const infoFieldEmail = validateInput(
      valueForm.email,
      "email",
      0,
      regexEmail
    );
    let infoFieldPassword = validateInput(
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

    if (type === "register") {
      const infoFieldFullName = validateInput(
        valueForm.fullName,
        "h??? v?? t??n",
        0,
        ""
      );

      infoFieldPassword = validateInput(valueForm.password, "password", 6, "");

      const infoFieldConfirmPassword = validateInput(
        valueForm.confirmPassword,
        "x??c nh???n password",
        0,
        ""
      );

      if (!infoFieldFullName.isValid) {
        isValid = infoFieldFullName.isValid;
        newError.fullName = infoFieldFullName.message;
      }

      if (!infoFieldPassword.isValid) {
        isValid = infoFieldPassword.isValid;
        newError.password = infoFieldPassword.message;
      }

      if (!infoFieldConfirmPassword.isValid) {
        isValid = infoFieldConfirmPassword.isValid;
        newError.confirmPassword = infoFieldConfirmPassword.message;
      } else if (valueForm.confirmPassword !== valueForm.password) {
        isValid = false;
        newError.confirmPassword = "X??c nh???n m???t kh???u kh??ng kh???p";
      } else {
        newError.confirmPassword = "";
      }
    }
    if (isValid) {
      const { fullName, email, password } = valueForm;
      setLoading(true);
      if (type === "register") {
        const res = await dispatch(
          registerUser({
            fullName,
            email,
            password,
            idCity: valueCity,
            idDistrict: valueDistrict,
            idStreet: valueStreet,
            address: valueForm.address,
          })
        );
        if (res?.payload?.status === 200) {
          openNotificationWithIcon("success", res?.payload?.msg);
          navigate("/login");
        }
      } else {
        const res = await dispatch(loginUser({ email, password }));
        console.log("res: ", res?.payload);
        if (res?.payload?.status === "200") {
          openNotificationWithIcon("success", res?.payload?.msg);
          navigate("/");
        }
      }
      setValueForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
      });
      setLoading(false);
    }
    setErrorForm({ ...newError });
  };

  const handleLoginIcon = (icon) => async () => {
    setLoadingSignInWithIcon(true);
    if (icon === "google") {
    }
    setLoadingSignInWithIcon(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueForm({
      ...valueForm,
      [name]: value.trim(),
    });
  };

  const handleChangeAddress = async (e, type) => {
    console.log("e, type: ", e, type);
    if (type === "city") {
      if (e !== "defaultCity") {
        await dispatch(getListDistrictByIdCityAction({ idCity: e }));
      } else {
        await dispatch(setListDistrict([]));
        await dispatch(setListStreet([]));
      }
      await setValueCity(e);
      await setValueDistrict("defaultDistrict");
      await setValueStreet("defaultStreet");
    } else if (type === "district") {
      if (e !== "defaultDistrict") {
        await dispatch(
          getListStreetByIdDistrictAction({
            idDistrict: e,
          })
        );
      }
      await setValueDistrict(e);
      await setValueStreet("defaultStreet");
    } else {
      await setValueStreet(e);
    }
  };

  return (
    <div className="d-flex">
      <div>
        <div
          className="wrapper-form-action sign-in-icon"
          onClick={handleLoginIcon("google")}
        >
          <IconGoogle />
          <p>????ng nh???p v???i google</p>
          {loadingSignInWithIcon && (
            <div className="wrapper-sign-in-progress">
              <div className="requestProgress">
                <div className="bar" />
              </div>
            </div>
          )}
        </div>
        <div
          className="wrapper-form-action sign-in-icon"
          onClick={handleLoginIcon("facebook")}
        >
          <IconFacebook />
          <p>????ng nh???p v???i facebook</p>
        </div>
      </div>
      <div className="form-border-right" />
      <div>
        {type === "register" && (
          <div className="form-group form-group-width">
            <Input
              status={errorForm.fullName.length > 0 ? "error" : ""}
              size="large"
              placeholder="H??? v?? t??n"
              allowClear
              onChange={handleChange}
              name="fullName"
              value={valueForm.fullName || ""}
            />
            {errorForm.fullName.length > 0 && (
              <small className="form-error">{errorForm.fullName}</small>
            )}
          </div>
        )}
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
            placeholder="M???t kh???u"
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
        {type === "register" && (
          <div>
            <div className="form-group form-group-width">
              <Input.Password
                status={errorForm.confirmPassword.length > 0 ? "error" : ""}
                size="large"
                placeholder="X??c nh???n m???t kh???u"
                allowClear
                onChange={handleChange}
                name="confirmPassword"
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                value={valueForm.confirmPassword || ""}
              />
              {errorForm.confirmPassword.length > 0 && (
                <small className="form-error">
                  {errorForm.confirmPassword}
                </small>
              )}
            </div>
            <Space className="wrapper-auth-address">
              <div className="form-group ">
                <Select
                  placeholder="Th??nh ph???/ T???nh"
                  style={{ width: "100%" }}
                  onChange={(e) => handleChangeAddress(e, "city")}
                  loading={listCity.load}
                  defaultValue={"defaultCity"}
                >
                  <Option value={"defaultCity"}>Ch???n th??nh ph???</Option>
                  {listCity?.data?.map((item, index) => {
                    return (
                      <Option key={"item-city-" + index} value={item.idCity}>
                        {item.city}
                      </Option>
                    );
                  })}
                </Select>

                {valueCity === "defaultCity" && (
                  <small className="form-error">Ch???n th??nh ph???</small>
                )}
              </div>
              <div className="form-group ">
                <Select
                  placeholder="Huy???n"
                  style={{ width: "100%" }}
                  onChange={(e) => handleChangeAddress(e, "district")}
                  defaultValue={"defaultDistrict"}
                  loading={listDistrict.load}
                  value={valueDistrict}
                >
                  <Option value={"defaultDistrict"}>Ch???n huy???n</Option>
                  {listDistrict?.data?.map((item, index) => {
                    return (
                      <Option
                        key={"item-district-" + index}
                        value={item.idDistrict}
                      >
                        {item.district}
                      </Option>
                    );
                  })}
                </Select>

                {valueDistrict === "defaultDistrict" && (
                  <small className="form-error">Ch???n huy???n</small>
                )}
              </div>
              <div className="form-group ">
                <Select
                  placeholder="X??"
                  style={{ width: "100%" }}
                  onChange={(e) => handleChangeAddress(e, "street")}
                  defaultValue={"defaultStreet"}
                  loading={listStreet.load}
                  value={valueStreet}
                >
                  <Option value={"defaultStreet"}>Ch???n ph?????ng / x??</Option>
                  {listStreet?.data?.map((item, index) => {
                    return (
                      <Option
                        key={"item-street-" + index}
                        value={item.idStreet}
                      >
                        {item.street}
                      </Option>
                    );
                  })}
                </Select>

                {valueStreet === "defaultStreet" && (
                  <small className="form-error">Ch???n ph?????ng / x??</small>
                )}
              </div>
            </Space>
            <div className="form-group form-group-width">
              <Input
                size="large"
                placeholder="Th??n/???????ng"
                allowClear
                onChange={handleChange}
                name="address"
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                value={valueForm.address || ""}
              />
            </div>
          </div>
        )}
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          {type === "register" ? "????ng k??" : "????ng nh???p"}
        </Button>
      </div>
    </div>
  );
}

export default Form;
