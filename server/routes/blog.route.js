const express = require("express");
const blogUpload = require("../middleware/blog.middleware");
const blogControl = require("../controllers/blog.control");
const { authentication, adminAthuorization } = require("../middleware/authentication");

const router = express.Router();

router
  .route("/")
  .post(authentication, blogUpload.single("image"), blogControl.createBlog)
  .get(authentication, blogControl.getBlogs)
  .patch(authentication, blogUpload.single("image"), blogControl.updateBlog);

router.route("/:id").delete(authentication,blogControl.deleteBlog)  

router.get("/getAll" , authentication,adminAthuorization , blogControl.getAllBlog)

module.exports = router;
