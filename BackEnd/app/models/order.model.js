const db = require("../utils/database");
const TABLE_NAME_PRODUCTS = "products";
const TABLE_NAME_IMAGES_PRODUCT = "imagesproduct";
const TABLE_NAME_SPECIFICATIONS = "specifications";
const TABLE_NAME_OPTIONS = "options";
const TABLE_NAME_ATTRIBUTES = "attributes";
const TABLE_NAME_BRANDS = "brands";
const TABLE_NAME_CATEGORIES = "categories";
const TABLE_NAME_ORDERS = "orders";
const TABLE_NAME_ORDER_DETAIL = "orderdetail";

const addOrderDetail = (idOrder, item) => {
  return new Promise((resolve) => {
    const q = `INSERT INTO ${TABLE_NAME_ORDER_DETAIL} (idOrder, idProduct)
    VALUES (${idOrder}, '${item.idProduct}')`;
    // console.log("q: ", q);
    resolve(db.execute(q));
  });
};
class Order {
  addOrder = async (idCustomer, name, phone, address, note, listProduct) => {
    // return an array containing records of db
    const queryOrder = `INSERT INTO ${TABLE_NAME_ORDERS} (idCustomer, name, phone, address, note, status) VALUES (${parseInt(
      idCustomer
    )}, '${name}', '${phone}', '${address}', '${note}', 'đang xác minh')`;
    const executeOrder = await db.execute(queryOrder);
    const { insertId } = executeOrder[0];
    const executeOrderDetail = await Promise.all(
      listProduct.map((item) => {
        return addOrderDetail(insertId, item);
      })
    );
    return executeOrderDetail[0];
  };

  getOrderByIdCustomer = async (idCustomer) => {
    const queryOrder = `select * from ${TABLE_NAME_ORDERS} where idCustomer = ${idCustomer} order by createdAt DESC`;
    const executeOrder = await db.execute(queryOrder);
    console.log("executeOrder: ", executeOrder[0]);
    let res = [];
    let listIdProductByIdOrder = [];
    await Promise.all(
      executeOrder[0]?.map(async (item) => {
        let listProduct = [];
        const queryOrderDetail = `select * from ${TABLE_NAME_ORDER_DETAIL} where idOrder = ${item.idOrder}`;
        const executeOrderDetail = await db.execute(queryOrderDetail);
        // listIdProductByIdOrder.push()
        // console.log("executeOrderDetail: ", executeOrderDetail[0]);
        // executeOrderDetail[0]?.forEach((itemDetail) =>
        //   listIdProductByIdOrder.push(itemDetail.idProduct)
        // );
        res.push({
          ...item,
          listIdProductByIdOrder: executeOrderDetail[0],
        });
        return item;
      })
    );

    await Promise.all(
      res.map(async (item) => {
        item.listIdProductByIdOrder?.map(async (itemChild, index) => {
          const queryProduct = `select * from ${TABLE_NAME_PRODUCTS} where idProduct = ${itemChild.idProduct}`;
          const executeProduct = await db.execute(queryProduct);
          console.log("executeProduct: ", executeProduct[0]);

          return { ...itemChild, ...executeProduct[0] };
        });
      })
    );

    console.log("res: ", res);
    // await Promise.all(listIdProductByIdOrder?.map((item) => {}));
    return res;
  };
}

module.exports = new Order();
