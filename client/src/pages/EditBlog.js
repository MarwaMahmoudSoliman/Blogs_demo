import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Api from "../config/api";
import { notifyError, notifySuccess } from "../component/Notify";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBlogs } from "../rtk/slices/blogSlice";
import defaultImage from "../assets/default-featured-image.png.jpg";
import domain from "../config/domain";
const EditBlog = () => {
  const imageField = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog?.data?.blogs);
  const { id } = useParams();
  const blog = blogs.find((blog) => blog._id === id);

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [image, setImage] = useState("");

  // change inputs
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageChange = (event) => {
    let image = event.target.files[0];
    setImage(image);
  };
  const uploadImage = () => {
    imageField.current.click();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Api.patch(
        "api/blogs",
        { ...inputs, image: image || inputs.image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(fetchUserBlogs());
      notifySuccess("Blog updated !!");
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || error?.response?.data?.error;

      notifyError(errMsg);
    }
  };

  useEffect(() => {
    dispatch(fetchUserBlogs());
    setInputs(blog);
  }, [id]);
  return (
    <>
      <section className="py-5 my-5">
        <Container>
          <div className="card p-3 mb-1 mt-2  mx-auto w-50">
            <h3 className="pb-2">Update A Post</h3>
            <form action="" onSubmit={handleSubmit}>
              <h6>Title</h6>
              <input
                type="text"
                name="title"
                className="mb-2 w-100 p-1"
                value={inputs.title}
                onChange={handleChange}
              />
              <h6>Content</h6>
              <input
                type="text"
                name="content"
                className="mb-2 w-100 p-1"
                value={inputs.content}
                onChange={handleChange}
              />
              <input
                type="file"
                style={{ display: "none" }}
                className="mb-2 w-100 p-1"
                name="image"
                onChange={handleImageChange}
                ref={imageField}
              />

              <img
                src={
                  (image && URL.createObjectURL(image)) ||
                  domain + inputs.image ||
                  defaultImage
                }
                style={{ width: "200px", height: "100px" }}
              />
              <button
                type="button"
                className="btn btn-warning w-100 my-2"
                onClick={uploadImage}
              >
                Upload Image
              </button>
              <button type="submit" className="btn btn-warning w-100 mb-2">
                Submit
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default EditBlog;
