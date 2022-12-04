import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const orders = {
  // api admin
  addOrder(idCustomer, name, phone, address, note, listProduct) {
    const url = "/orders/add";
    return instance.post(
      url,
      {
        idCustomer,
        name,
        phone,
        address,
        note,
        listProduct,
      },
      { headers: authHeader() }
    );
  },
};

export default orders;
