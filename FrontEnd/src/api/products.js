import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const products = {
  search() {
    const url = "/products";
    return instance.get(url);
  },

  detail(idProduct) {
    const url = "/products/detail";
    return instance.post(url, { idProduct: idProduct });
  },

  getAllProductByCategory(nameUrl) {
    const url = "/products/productByCategory";
    return instance.post(url, { nameUrl });
  },

  getSearchListProduct(queryString) {
    const url = "/products/search" + queryString;
    return instance.get(url);
  },

  // api admin
  getAllProductAdmin() {
    const url = "/products/admin/products";
    return instance.post(url, {}, { headers: authHeader() });
  },

  addProductsAdmin(info) {
    const url = "/products/admin/add";
    const {
      thumbnail,
      images,
      description,
      price,
      specifications,
      name,
      inventory,
      category,
      brand,
      isOption,
      listOption,
      isDiscount,
      discount,
    } = info;
    return instance.post(
      url,
      {
        info: {
          thumbnail,
          images,
          description,
          price: parseFloat(price),
          specifications,
          name,
          inventory: parseInt(inventory),
          category: parseInt(category),
          brand: parseInt(brand),
          isOption: isOption === true ? 1 : 0,
          listOptions: listOption,
          isDiscount: isDiscount === true ? 1 : 0,
          discount: parseInt(discount),
        },
      },
      { headers: authHeader() }
    );
  },

  updateProductsAdmin(infoProduct, idProduct) {
    const url = "/products/admin/update";
    const {
      thumbnail,
      images,
      description,
      price,
      specifications,
      name,
      inventory,
      category,
      brand,
      isOption,
      listOption,
      isDiscount,
      discount,
    } = infoProduct;
    console.log("infoProduct api: ", infoProduct, idProduct);
    return instance.post(
      url,
      {
        info: {
          idProduct: parseInt(idProduct),
          thumbnail,
          images,
          description,
          price: parseFloat(price),
          specifications,
          name,
          inventory: parseInt(inventory),
          category: parseInt(category),
          brand: parseInt(brand),
          isOption: isOption === true ? 1 : 0,
          listOptions: listOption,
          isDiscount: isDiscount === true ? 1 : 0,
          discount: parseInt(discount),
        },
      },
      { headers: authHeader() }
    );
  },
};

export default products;
