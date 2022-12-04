const db = require("../utils/database");
const bcrypt = require("bcrypt");
const TABLE_NAME_CUSTOMER = "customers";

const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

class Auth {
  loginUser = async (email, password) => {
    // return an array containing records of db
    let res = {};
    const [queryInfoCustomer] = await db.execute(
      `select * from ${TABLE_NAME_CUSTOMER} where email='${email}' and isActive=${1}`
    );

    if (
      await bcrypt.compare(password, queryInfoCustomer?.[0]?.password || "")
    ) {
      res = {
        ...queryInfoCustomer[0],
      };
    } else {
      res = {};
    }
    return res;
  };

  loginAdmin = async (email, password) => {
    let res = {};
    const [queryInfoCustomer] = await db.execute(
      `select * from ${TABLE_NAME_CUSTOMER} where email='${email}' and isAdmin = 1`
    );
    if (
      await bcrypt.compare(password, queryInfoCustomer?.[0]?.password || "")
    ) {
      res = {
        ...queryInfoCustomer[0],
      };
    } else {
      res = {};
    }
    return res;
  };

  registerUser = async (
    fullName,
    email,
    password,
    idCity,
    idDistrict,
    idStreet,
    address
  ) => {
    console.log(
      "fullName, email, password",
      fullName,
      email,
      password,
      idCity,
      idDistrict,
      idStreet,
      address
    );
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const queryInsertUser = `insert into ${TABLE_NAME_CUSTOMER} (name, email, avatar, phone, password, address, isActive, idCity, idDistrict, role, isAdmin ) 
    values ('${fullName}', '${email}', '', '', '${hashedPassword}', '${address}', 1, ${idCity}, ${idDistrict}, 0, 0)`;
    const [executeInsertUser] = await db.execute(queryInsertUser);

    let res = {
      ...executeInsertUser[0],
    };

    return res;
  };
}

module.exports = new Auth();
