import instance from "../configs/axios";

const address = {
  getAllCity() {
    const url = "/address/city";
    return instance.post(url);
  },

  getListDistrictByIdCity(idCity) {
    const url = "/address/district";
    return instance.post(url, {
      idCity,
    });
  },

  getListStreetByIdDistrict(idDistrict) {
    const url = "/address/street";
    return instance.post(url, { idDistrict });
  },
};

export default address;
