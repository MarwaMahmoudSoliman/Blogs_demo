const Joi = require("joi");
const httpStatus = require("../Utils/httpStatus");

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  
    email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  role : Joi.string()
});

const registerValidation = (req, res, next) => {
  try {
    const {  error , value } = schema.validate(req.body);
    console.log(value)
    console.log(error)
    if (error) {
     
      let errorMessage = error.details[0].message;
      console.log(errorMessage)
      return res
        .status(400)
        .json({
          status: httpStatus.FAIL,
          message: errorMessage,
          statusCode: 400,
        });
    }
    next();
  } catch (e) {
    return res
      .status(500)
      .json({ status: httpStatus.ERROR, message: e.message, statusCode: 500 });
  }
};
module.exports = registerValidation;
