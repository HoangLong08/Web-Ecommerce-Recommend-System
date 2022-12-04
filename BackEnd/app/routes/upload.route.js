const express = require("express");
const router = express.Router();
const multer = require("multer");
const { verify, isAdmin } = require("../utils/verify");

//admin
let images = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "app/uploads");
  },
  filename: (req, file, cb) => {
    console.log("file: ", file);
    const match = ["image/png", "image/jpeg"];
    const nameFile = file.originalname.replace(" ", "_");
    tmpUrl = Date.now() + nameFile;
    const { originalname } = file;
    images.push({
      name: file.originalname,
      url: "http://localhost:" + 5000 + "/images/" + tmpUrl,
    });
    cb(null, tmpUrl);
  },
});

const upload = multer({ storage: storage }).array("files", 10);

router.post(
  "/admin/uploads",
  verify,
  isAdmin,
  upload,
  async (req, res, next) => {
    const tmpImages = [...images];

    const resData = res.status(200).json({
      status: 200,
      message: "upload images success",
      data: tmpImages,
    });
    images = [];
    return resData;
  }
);

module.exports = router;
