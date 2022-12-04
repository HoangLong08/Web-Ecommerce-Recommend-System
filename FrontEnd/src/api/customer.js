import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const customers = {
  search() {
    const url = "/customers";
    return instance.get(url);
  },

  // api page personal
  postDetailCustomer(idCustomer) {
    const url = "/customers/detail";
    return instance.post(
      url,
      {
        idCustomer,
      },
      { headers: authHeader() }
    );
  },

  updateInfoCustomer(idCustomer, avatar, name, phone) {
    const url = "/customers/update";
    return instance.post(
      url,
      {
        idCustomer,
        avatar,
        name,
        phone,
      },
      { headers: authHeader() }
    );
  },

  getOrderByIdCustomer(idCustomer) {
    const url = "/customers/order";
    return instance.post(
      url,
      {
        idCustomer,
      },
      { headers: authHeader() }
    );
  },
};

export default customers;
