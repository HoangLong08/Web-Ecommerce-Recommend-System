import authHeader from "../configs/authHeader";
import instance from "../configs/axios";
// import authHeader from 'services/authHeader';

const categories = {
  getAllCategory() {
    const url = "/categories";
    return instance.get(url);
  },

  // api admin
  getAllCategoriesAdmin(nameCategory) {
    const url = "/categories/admin/categories";
    return instance.post(
      url,
      {
        nameCategory: nameCategory,
      },
      { headers: authHeader() }
    );
  },

  postCategoriesAdmin(idCategory, name) {
    const url = "/categories/admin/update";
    return instance.post(
      url,
      {
        idCategory,
        name,
      },
      { headers: authHeader() }
    );
  },

  detailCategoriesAdmin(idCategory) {
    const url = "/categories/admin/detail";
    return instance.post(url, {
      idCategory,
    });
  },

  addCategoriesAdmin(name) {
    const url = "/categories/admin/add";
    return instance.post(
      url,
      {
        name,
      },
      { headers: authHeader() }
    );
  },

  deleteCategoriesAdmin(idCategory) {
    const url = "/categories/admin/delete/" + idCategory;
    return instance.delete(url, { headers: authHeader() });
  },
};

export default categories;
