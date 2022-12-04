import instance from "../configs/axios";

const rs = {
  getProductsSimilar(specs, idProduct) {
    const url = "/products/product-similar";
    return instance.post(url, { specs: specs, idProduct: idProduct });
  },

  getProductRatingSimilar(idCustomer) {
    const url = "/products//product-similar-rating";
    return instance.post(url, { idCustomer });
  },
};

export default rs;
