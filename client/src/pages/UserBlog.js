import React, { useEffect } from "react";
import BlogCard from "../component/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBlogs } from "../rtk/slices/blogSlice";
import domain from "../config/domain";
import { fetchUserhData } from "../rtk/slices/userSlice";
function UserBlog() {
  const user = useSelector((state) => state.user?.data?.user);
  const username = user.firstName + " " + user.lastName;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserBlogs());
    dispatch(fetchUserhData());
  }, []);
  const blogs = useSelector((state) => state.blog?.data?.blogs);
  console.log(blogs);

  return (
    <>
      <section className="userBlog py-5 my-5">
        {blogs &&
          blogs.map((blog) => (
            <>
              <BlogCard
                id={blog._id}
                title={blog.title}
                content={blog.content}
                image={domain + blog.image}
                username={username}
                isUser={true}
              />
            </>
          ))}
      </section>
    </>
  );
}

export default UserBlog;
