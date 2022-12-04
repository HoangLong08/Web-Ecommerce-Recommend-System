import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal, Space } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import HeadPage from "../components/HeadPage";
import TableAntd from "../components/Table";
import {
  addCategoriesAdminAction,
  deleteCategoriesAdminAction,
  detailCategoriesAdminAction,
  getAllCategoryAdminAction,
  postCategoriesAdminAction,
} from "../../../store/category/categories.action";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import FormCategory from "./Form";
import { isEmpty } from "lodash";
import { openNotificationWithIcon } from "../../../utils";

const columns = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCategoryAdmin = useSelector(
    (state) => state.categoriesSlice.listCategoryAdmin
  );

  const valueFormCategoryName = useSelector(
    (state) => state.categoriesSlice.valueFormCategory.name
  );

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const [idCategory, setIdCategory] = useState();

  useEffect(() => {
    dispatch(
      getAllCategoryAdminAction({
        nameCategory: "",
      })
    );
  }, [dispatch]);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    let res;
    await setLoading(true);
    if (typeForm === "edit") {
      res = await dispatch(
        postCategoriesAdminAction({
          idCategory,
          nameCategory: valueFormCategoryName,
        })
      );
    } else if (typeForm === "delete") {
      res = await dispatch(
        deleteCategoriesAdminAction({
          idCategory,
        })
      );
    } else {
      res = await dispatch(
        addCategoriesAdminAction({
          nameCategory: valueFormCategoryName,
        })
      );
    }
    if (!isEmpty(res.payload)) {
      openNotificationWithIcon("success", res.payload.msg);
    } else {
      openNotificationWithIcon("fail", "Thất bại");
    }
    await dispatch(
      getAllCategoryAdminAction({
        nameCategory: "",
      })
    );
    await setLoading(false);
    await setOpen(false);
  };
  const handleCancel = () => {
    setIdCategory();
    setOpen(false);
  };

  const renderDataSource = () => {
    return listCategoryAdmin?.data?.map((item, index) => {
      return {
        key: index,
        title: item.name,
        action: (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={async () => {
                await setIdCategory(item.idCategory);
                await dispatch(
                  detailCategoriesAdminAction({
                    idCategory: parseInt(item.idCategory),
                  })
                );
                await setTypeForm("edit");
                await showModal();
              }}
            />
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                setIdCategory(item.idCategory);
                setTypeForm("delete");
                showModal();
              }}
            />
          </Space>
        ),
      };
    });
  };
  return (
    <div>
      <HeadPage
        title="Thể loại"
        actionMenu={
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setTypeForm("add");
                showModal();
              }}
            >
              Thêm thể loại
            </Button>
          </Space>
        }
        isBack={0}
      />
      <div className="box-ad-page wrapper-box-admin-page">
        <div className="wrapper-filter-page-admin">
          <div className="container-filter-page-admin-left">
            <div>
              <Input
                placeholder="Tìm kiếm tên thể loại"
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
          loading={listCategoryAdmin.load}
        />
      </div>
      <Modal
        open={open}
        title={
          typeForm === "add"
            ? "Thêm thể loại"
            : typeForm === "edit"
            ? "Cập nhật thể loại"
            : "Xóa thể loại"
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {typeForm === "add"
              ? "Thêm"
              : typeForm === "edit"
              ? "Cập nhật"
              : "Xóa"}
          </Button>,
        ]}
      >
        {typeForm === "delete" ? (
          "Bạn có chắc chắn muốn xóa thể loại này không ?"
        ) : (
          <FormCategory type={typeForm} idCategory={idCategory} />
        )}
      </Modal>
    </div>
  );
}

export default Category;
