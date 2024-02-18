const express = require("express")
const router = express.Router()
const authControl = require("../controllers/auth.control"); 


const loginValidation = require("../middleware/loginValidationSchema");
const registerValidation = require("../middleware/registerValidationSchema");
router.post('/register',registerValidation,authControl.register);
router.post('/login',loginValidation, authControl.login);


module.exports = router