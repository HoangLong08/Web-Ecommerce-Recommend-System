import authHeader from "../configs/authHeader";
import instance from "../configs/axios";
// import authHeader from 'services/authHeader';

const categories = {
  search() {
    const url = "/categories";
    return instance.get(url);
  },

  // api admin
  getAllBrandAdmin(idCategory, nameBrand) {
    const url = "/brands/admin/brands";
    return instance.post(
      url,
      {
        idCategory,
        nameBrand,
      },
      { headers: authHeader() }
    );
  },
};

export default categories;
