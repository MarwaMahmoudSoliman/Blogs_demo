import React, { useEffect } from 'react'
import BlogCard from '../component/BlogCard'
import { fetchAdminBlogs } from '../rtk/slices/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import domain from '../config/domain'

function Blogs() {
  const dispatch = useDispatch()
  const adminBlogs = useSelector(state=>state.blog?.allData?.blogs)
  useEffect(()=>{
    dispatch(fetchAdminBlogs())
  },[])
  return (
    <>
   
     <section className='blogs py-5 my-5'>
     {adminBlogs&& adminBlogs.map((blog)=>(
      <>
      <BlogCard
      id = {blog._id}
      image={domain+blog.image}
      title={blog.title}
      content={blog.content}
      username={blog.owner.firstName + " " + blog.owner.lastName}
      
      />
      </>
      
     ))}

     </section>

     
    </>
   
  )
}

export default Blogs