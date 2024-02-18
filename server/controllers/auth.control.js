const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatus = require("../Utils/httpStatus");

const register = async (req, res) => {
  const { firstName , lastName, email, password , role } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(401)
      .json({
        status: httpStatus.ERROR,
        message: "All Fileds are Required" ,
      });
  }
  try {
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res
        .status(403)
        .json({
          status: httpStatus.FAIL,
           message: "User alerady exists" ,
        });
    }

    const salt = await bcryptjs.genSalt(8);
    const hashPassword = await bcryptjs.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role
    });

    await user.save();
    return res
      .status(201)
      .json({ status: httpStatus.SUCCESS, user })
  } catch (e) {
    res
      .status(500)
      .json({
        status: httpStatus.ERROR,
        data: null,
        message: e.message,
        code: 500,
      });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({status : httpStatus.FAIL ,  message: "All Fields are Required" });
  }
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ status : httpStatus.FAIL , message: "Invalid email or password" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status : httpStatus.FAIL , message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: user._id},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2d" }
    );
    user.tokens.push(token)
    user.save()
    // const refershToken = jwt.sign(
    //   { _id: user._id.toString },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "7d" }
    // );
   
    res.cookie("access_token",`Bearer ${token}` , {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   

    return res.send({ status : httpStatus.SUCCESS});
  } catch (e) {
    return res.status(500).json({status : httpStatus.ERROR , message :e.message , statusCode : 500});
  }
};
module.exports = { register, login };
