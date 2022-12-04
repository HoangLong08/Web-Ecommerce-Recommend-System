import instance from "../configs/axios";

const auth = {
  loginAdmin(email, password) {
    const url = "/auth/loginAdmin";
    return instance.post(url, {
      email: email,
      password: password,
    });
  },

  loginUser(email, password) {
    const url = "/auth/loginUser";
    return instance.post(url, {
      email: email,
      password: password,
    });
  },

  registerUser(
    fullName,
    email,
    password,
    idCity,
    idDistrict,
    idStreet,
    address
  ) {
    const url = "/auth/registerUser";
    return instance.post(url, {
      fullName: fullName,
      email: email,
      password: password,
      idCity,
      idDistrict,
      idStreet,
      address,
    });
  },
};

export default auth;
