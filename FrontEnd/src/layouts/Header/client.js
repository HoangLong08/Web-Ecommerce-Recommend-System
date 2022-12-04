import React, { useEffect, useState } from "react";
import { Badge, Button, Input, Popover } from "antd";
import {
  Link,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import { IconUserRegular, IconCartRegular } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { removeAuth } from "../../store/auth/auth.reducer";

const { Search } = Input;

const getQueryParams = (query) =>
  window.location.search
    .replace("?", "")
    .split("&")
    .map((e) => e.split("=").map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

function HeaderClient() {
  const dispatch = useDispatch();
  const location = useLocation();
  const paramFromUrl = getQueryParams(location.search);
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.authSlice);
  const shoppingCart = useSelector(
    (state) => state.shoppingCartSlice.shoppingCart
  );
  const name = authSlice?.infoAccount?.name?.split(" ");
  const [open, setOpen] = useState(false);
  const [valueInput, setValueInput] = useState("");
  useEffect(() => {
    if (paramFromUrl?.keyword) {
      setValueInput(paramFromUrl?.keyword?.replace("+", " ") || "");
    }
  }, [paramFromUrl?.keyword]);

  const onChange = (e) => {
    console.log("value: ", e.target.value);
    setValueInput(e.target.value);
  };

  const onSearch = (value) => {
    if (value.length > 0) {
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({
          keyword: value,
        })}`,
      });
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(removeAuth({}));
    navigate("/login");
  };

  return (
    <header className="wrapper-header wrapper-header-position">
      <div className="container">
        <div className="header-main">
          <Link to="/">
            <h1>LongDev</h1>
          </Link>
          <div className="ui-search-body">
            <Search
              placeholder="nhập tên sản phẩm cần tìm ..."
              className="wrapper-big-search"
              enterButton="Tìm kiếm"
              size="large"
              loading={false}
              onSearch={onSearch}
              value={valueInput || ""}
              onChange={onChange}
            />
          </div>
          <div className="header-menu">
            {authSlice?.infoAccount?.accessToken ? (
              <Popover
                content={
                  <>
                    <Button
                      onClick={() => {
                        navigate("/profile/personal");
                      }}
                      style={{
                        width: "160px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                      type="link"
                      block
                    >
                      Thông tin tài khoản
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/profile/orders");
                      }}
                      style={{
                        width: "160px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                      type="link"
                      block
                    >
                      Quản lý đơn hàng
                    </Button>
                    <Button
                      onClick={() => handleLogout()}
                      style={{
                        width: "160px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                      type="primary"
                    >
                      Đăng xuất
                    </Button>
                  </>
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <div className="header-cart header-item">
                  <div className="wrapper-icon-cart">
                    <IconUserRegular className="icon-user" />
                  </div>
                  <span className="text-icon-cart">
                    {name?.[name?.length - 1]}
                  </span>
                </div>
              </Popover>
            ) : (
              <div
                className="header-auth"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <IconUserRegular className="icon-user" />
                <span className="text-icon-user">
                  Sign In <br />
                  Login In
                </span>
              </div>
            )}
            {/* <div className="header-cart header-item">
              <div className="wrapper-icon-cart">
                <IconBagDollar className="icon-order" />
              </div>
              <span className="text-icon-cart">Order</span>
            </div> */}
            <div
              className="header-cart header-item"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <Badge count={shoppingCart.length}>
                <div className="wrapper-icon-cart">
                  <IconCartRegular className="icon-cart" />
                </div>
                <span className="text-icon-cart">Cart</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderClient;
