const express = require("express")
const router = express.Router()
const authRoutes = require("./auth.route")
const blogRoutes = require("./blog.route")
const userRoutes = require("./user.route")

router.use("/api/auth", authRoutes)
router.use("/api/users" , userRoutes)
router.use("/api/blogs" , blogRoutes)
module.exports = router