const Blog = require("../models/blog");
const httpStatus = require("../Utils/httpStatus");
const fs = require("fs");
const blogControl = {
  createBlog: async (req, res) => {
    try {
      const date = new Date().toISOString();
      const blog = new Blog({ ...req.body, owner: req.user._id, date });
      console.log(blog)
      console.log(req.file)
      if (req.file) {
        blog.image = `/api/blog/${req.file.filename}`;
      }
      await blog.save();
      return res
        .status(200)
        .json({ sataus: httpStatus.SUCCESS, blog });
    } catch (e) {
      return res
        .status(500)
        .json({
          sataus: httpStatus.ERROR,
          message: e.message,
          statusCode: 500,
        });
    }
  },
  getBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find({ owner: req.user._id });
      if (!blogs) {
        return res
          .status(404)
          .json({
            status: httpStatus.FAIL,
             blogs: null, message: "NO BLOGS FOUND!" ,
          });
      }
      return res
        .status(200)
        .json({ status: httpStatus.SUCCESS,  blogs  });
    } catch (e) {
      return res
        .status(500)
        .json({
          sataus: httpStatus.ERROR,
          message: e.message,
          statusCode: 500,
        });
    }
  },
  updateBlog: async (req, res) => {

    const blog = await Blog.findById(req.body._id)
    const imageName = blog.image?.split("/")[3]
    console.log(imageName)
    try {
      if (req.file) {
        console.log(req.file);
        let deletePath = `./uploads/${imageName}`;
        fs.unlinkSync(deletePath);
        var imagePath = `/api/blog/${req.file.filename}`;
      }

      const newBlog = await Blog.findByIdAndUpdate(
        req.body._id,
        { ...req.body, image: imagePath },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({
          status: httpStatus.SUCCESS,
           message: "UPDATED BLOG SUCCESSFULLY" ,
        });
    } catch (e) {
      return res
        .status(500)
        .json({
          sataus: httpStatus.ERROR,
          message: e.message,
          statusCode: 500,
        });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      let id = req.params.id;
      console.log(id);
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) {
        return res
          .status(404)
          .json({
            status: httpStatus.FAIL,
            blog : null, message: "NO BLOGS FOUND!" ,
          });
      }

      return res
        .status(200)
        .json({
          status: httpStatus.SUCCESS,
          data: { message: "DELETED BLOG SUCCESSFULLY" },
        });
    } catch (e) {
      return res
        .status(500)
        .json({
          sataus: httpStatus.ERROR,
          message: e.message,
          statusCode: 500,
        });
    }
  },
  getAllBlog: async (req, res) => {
    try {
      
    
      const blogs = await Blog.find({}).populate("owner")
      console.log(blogs)
      if (!blogs) {
        return res
          .status(404)
          .json({
            status: httpStatus.FAIL,
             blogs : null, message: "NO BLOGS FOUND!" ,
          });
      }

      return res
        .status(200)
        .json({
          status: httpStatus.SUCCESS,
            blogs 
        });
    } catch (e) {
      return res
        .status(500)
        .json({
          sataus: httpStatus.ERROR,
          message: e.message,
          statusCode: 500,
        });
    }
  }
};
module.exports = blogControl;
