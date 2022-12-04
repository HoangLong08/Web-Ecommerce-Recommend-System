import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../layouts/FormInput";
import { setValueFormCategoryName } from "../../../store/category/categories.reducer";

function FormCategory({ type, idProduct }) {
  const dispatch = useDispatch();
  const detailCategoryAdmin = useSelector(
    (state) => state.categoriesSlice.detailCategoryAdmin
  );

  const valueFormCategoryName = useSelector(
    (state) => state.categoriesSlice.valueFormCategory.name
  );
  console.log("valueFormCategoryName: ", valueFormCategoryName);

  useEffect(() => {
    if (type === "edit") {
      dispatch(setValueFormCategoryName(detailCategoryAdmin.data?.name));
    } else {
      dispatch(setValueFormCategoryName(""));
    }
  }, [detailCategoryAdmin, type, dispatch]);

  return (
    <div>
      <FormInput
        title="Tên thể loại"
        htmlFor="name"
        type=""
        placeholder="Tên thể loại"
        name="name"
        value={valueFormCategoryName || ""}
        onChange={(e) => {
          const { value } = e.target;
          dispatch(setValueFormCategoryName(value));
        }}
        onKeyDown=""
        className=""
        error=""
      />
    </div>
  );
}

export default FormCategory;
