const express= require("express");
const router=express.Router();


const logInputConverter= require("../controllers/logInputConverter");

router.post('/', logInputConverter.logConverter )


module.exports = router;