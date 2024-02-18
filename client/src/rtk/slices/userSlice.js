import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../config/api";
import { notifyError } from "../../component/Notify";

export const fetchUserhData = createAsyncThunk("userSlice/fetchUserhData",async()=>{
   try{
    const res = await Api.get("api/users")
    return res.data
   }
   catch(error){
    const errMsg = error.response.data.message
    notifyError(errMsg)
   }
})
export const userLogout = createAsyncThunk("userSlice/userLogout",async()=>{
   try{
    const res = await Api.post("api/users/logout")
    return res.data
   }
   catch(error){
    const errMsg = error.response.data.message
    notifyError(errMsg)
   }
})
export const userSlice = createSlice({
    name : 'userSlice',
    initialState :{
        data : {},
        isLogin : false,
        isLogout : false
    },
    reducers : {
        login : (state)=>{
            state.isLogin=false
        },
        logout : (state)=>{
            state.isLogin=false
        }

    },
    extraReducers : (builder)=>{
        builder.addCase(fetchUserhData.fulfilled,(state,action)=>{
            state.data = action.payload
            state.isLogin = true

        })
        builder.addCase(userLogout.fulfilled,(state,action)=>{
         
            state.isLogin = false
    })
 
    
}})

export const {login,logout} = userSlice.actions
export default userSlice.reducer