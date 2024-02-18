import defaultImage from "../assets/default-featured-image.png.jpg";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { notifyError, notifySuccess } from "../component/Notify";
import Api from "../config/api";
function AddBlog() {
  const imageField = useRef();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageChange = (event) => {
    let image = event.target.files[0];
    setInputs({ ...inputs, image });
  };
  //form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      Api.post("/api/blogs", inputs, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notifySuccess("Blog created !!");
      setInputs({
        title: "",
        content: "",
        image: "",
      });
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || error?.response?.data?.error;

      notifyError(errMsg);
    }
  };

  // handle image
  const uploadImage = () => {
    imageField.current.click();
  };
  return (
    <>
      <section className="py-5 my-5">
        <Container>
          <div className="card p-3 mb-1 mt-2  mx-auto w-50">
            <h3 className="pb-2">Create A Post</h3>
            <form action="" onSubmit={handleSubmit}>
              <h6>Title</h6>
              <input
                type="text"
                value={inputs.title}
                name="title"
                className="mb-2 w-100 p-1"
                onChange={handleChange}
              />
              <h6>Content</h6>
              <input
                type="text"
                value={inputs.content}
                name="content"
                className="mb-2 w-100 p-1"
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
                  inputs.image
                    ? URL.createObjectURL(inputs.image)
                    : defaultImage
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
}

export default AddBlog;
