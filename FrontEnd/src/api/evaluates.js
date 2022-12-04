import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const evaluates = {
  postEvaluates(idCustomer, idProduct, title, content, stars) {
    const url = "/evaluates/add";
    return instance.post(
      url,
      {
        idCustomer,
        idProduct,
        title,
        content,
        stars,
      },
      { headers: authHeader() }
    );
  },

  getEvaluateByIdProduct(idProduct) {
    const url = "/evaluates/get";
    return instance.post(url, {
      idProduct,
    });
  },
};

export default evaluates;
