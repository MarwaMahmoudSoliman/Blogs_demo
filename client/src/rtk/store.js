import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import blogSlice from "./slices/blogSlice"
export const store = configureStore({
 reducer:{
    user : userSlice,
    blog : blogSlice
 }   
})