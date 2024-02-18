import { Button, Container } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import defaulUserImage from "../assets/user.png";
import Api from "../config/api";
import { notifyError, notifySuccess } from "../component/Notify";
import { useDispatch } from "react-redux";
import { fetchUserBlogs } from "../rtk/slices/blogSlice";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, title, content, image, username, isUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await Api.delete(`/api/blogs/${id}`);
      notifySuccess("Blog deleted successfully !!");
      dispatch(fetchUserBlogs());
    } catch (error) {
      console.log(error);
      const errMsg =
        error?.response?.data?.message || error?.response?.data?.error;

      notifyError(errMsg);
    }
  };
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };
  return (
    <>
      <Container>
        <div
          className="blogcard mx-auto shadow-lg p-2 m-2"
          style={{ width: "600px" }}
        >
          {isUser && (
            <div className="buttons d-flex justify-content-end">
              <Button
                variant="primary"
                size="sm"
                onClick={handleEdit}
                style={{ marginRight: "10px" }}
              >
                <FaEdit className="fs-5" />
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                <AiFillDelete className="fs-5" />
              </Button>
            </div>
          )}
          <div className="mt-3">
            <img
              src={defaulUserImage}
              className="circle-rounded"
              style={{ width: "50px", height: "50px"}}
            />
            <strong style={{ paddingLeft: "15px" }}>{username}</strong>
          </div>
          <div className="mt-3">
            <img src={image} style={{width:"100%", height : "300px"}} />
          </div>
          <div className="mt-3">
            <h3>
              <span className="text-danger">Title :</span> {title}
            </h3>
            <p>
              <span className="text-danger">Content :</span> {content}
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogCard;
