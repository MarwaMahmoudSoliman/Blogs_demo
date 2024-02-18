import Api from "../../config/api"
import { notifyError } from "../../component/Notify";
import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
export const fetchUserBlogs = createAsyncThunk("blogSlice/fetchUserBlogs" , async()=>{
    try{
        const res = await Api.get("/api/blogs")
       
        return res.data
    }
    catch(error){
        const errMsg = error.response.data.message
        notifyError(errMsg)
       }
})
export const fetchAdminBlogs = createAsyncThunk("blogSlice/fetchAdminBlogs" , async()=>{
    try{
        const res = await Api.get("/api/blogs/getAll")
        console.log(res)
       
        return res.data
    }
    catch(error){
        const errMsg = error.response.data.message
        notifyError(errMsg)
       }
})
export const blogSlice = createSlice({
    name : "fetchUserBlogs",
    initialState : {
        data : [],
        allData : []
    },
    reducers : {
       
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchUserBlogs.fulfilled,(state,action)=>{
            state.data =  action.payload
            
        })
        builder.addCase(fetchAdminBlogs.fulfilled,(state,action)=>{
            state.allData =  action.payload
            
        })
    }
})










// export const {} = fetchUserBlogs.actions
export default  blogSlice.reducer