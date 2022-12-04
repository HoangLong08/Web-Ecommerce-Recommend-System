import authHeader from "../configs/authHeader";
import instance from "../configs/axios";

const uploads = {
  uploadMultipleImagesAdmin(formData) {
    const url = "/uploads/admin/uploads";
    return instance.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });
  },
  uploadSingleImageAdmin(formData) {
    const url = "/uploads/admin/product-description";
    return instance.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });
  },
};

export default uploads;
