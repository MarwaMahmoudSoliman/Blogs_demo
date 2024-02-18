const express = require("express")

const {getAllUsers,getUser,deleteUser, updateUser, updatePassword, logout} = require("../controllers/user.control")
const { authentication, adminAthuorization } = require("../middleware/authentication")

const router = express.Router()
router.route("/:id")
        .delete(authentication,adminAthuorization,deleteUser)

router.use(authentication)
router.route("/")
      .get(getUser)
      .patch(updateUser)
    
      router.post("/logout",logout)
router.post("/update/password",updatePassword) 

router.get("/getall" , authentication , adminAthuorization , getAllUsers)


module.exports = router