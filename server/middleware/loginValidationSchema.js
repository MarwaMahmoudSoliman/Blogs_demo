const Joi = require("joi");
const httpStatus = require("../Utils/httpStatus");

const schema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  email: Joi.string().email().required(),

});

const loginValidation = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      let errorMessage = error.details[0].message;
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
module.exports = loginValidation;
