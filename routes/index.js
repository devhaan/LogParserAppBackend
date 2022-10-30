const express= require("express");
const upload = require("multer")();
const router=express.Router();
const fs = require("fs");


const logInputConverter= require("../controllers/logInputConverter");

router.post('/', upload.any(), logInputConverter.logConverter )


module.exports = router;