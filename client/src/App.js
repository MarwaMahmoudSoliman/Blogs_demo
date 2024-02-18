import logo from './logo.svg';
import './App.css';
import NavBar from './component/NavBar';
import { Route, Routes } from 'react-router-dom';
import UserBlog from './pages/UserBlog';
import Blogs from './pages/Blogs';
import AddBlog from './pages/AddBlog';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserhData } from './rtk/slices/userSlice';
import EditBlog from './pages/EditBlog';

function App() {
  const user= useSelector(state=>state.user?.data?.user)

  const isLogin= useSelector(state=>state.user?.isLogin)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUserhData())
  },[])
  
  return (
    <>
     <NavBar/>
     <ToastContainer/>
      <Routes>
        {isLogin && <Route path='/' element={<UserBlog/>}/>}
        {isLogin && user?.role==='ADMIN' && <Route path='/blogs' element={<Blogs/>}/>}
       {isLogin &&  <Route path='/add' element={<AddBlog/>}/>}
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        {isLogin&&<Route path='/edit-blog/:id' element={<EditBlog/>}/>}
        {isLogin && <Route path='*' element={<UserBlog/>}/>}

      </Routes>
    
  
    </>
  );
}

export default App;
