const express = require("express");
const router = new express.Router();
const { apiConstants } = require("../config/index");
const UploadFile = require("../controllers/UploadFile");

router.post(apiConstants.API_UPLOAD_FILE_IMAGES, UploadFile.uploadFile);
module.exports = router;