import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {  Link } from "react-router-dom";


import {
    User_REQUEST,
    User_SUCCESS,
    User_FAIL,
    User_Logout,
    User_Change,
    User_DeleteMessages,
    User_Approved,
  
 
} from "../constants/userConstants";

// User Sign In  
export const userSignin =(email,password) =>async (dispatch,getState) => {

    
  try{
    dispatch({ type: User_REQUEST });

    const data= await axios.post("/api/signin",{email,password})
    dispatch({
      type: User_SUCCESS,
      payload: data.data,
    });
    console.log(data.data,'After login get this data ok')
    toast("Successfully Sign In")
    localStorage.setItem("User",JSON.stringify(getState().User.User))

   }catch (error) {
    dispatch({
      type: User_FAIL,
      payload: error.response.data.message,
    });
  }
}



// User Logout
export const userlogout =() =>async (dispatch,getState) => {
    dispatch({ type: User_Logout });
    const data= await axios.get("/api/logout")
    console.log(data)
    toast("Successfully Sign Out")
    window.localStorage.removeItem("User");
}


export const markasallcompleted =() =>async (dispatch,getState) => {

    
  try{
    const data= await axios.get("/api/markasallcompleted")
    console.log(data.data.user,'of markasallcompleted')
    dispatch({
      type: User_Change,
      payload: data.data.user,
    });
    console.log(data.data,'ok')
    toast("Mark as all completed")
    localStorage.setItem("User",JSON.stringify(getState().User.User))

   }catch (error) {
    dispatch({
      type: User_FAIL,
      payload: error.response.data.message,
    });
  }
}


export const deleteall =() =>async (dispatch,getState) => {

    
  try{
    const data= await axios.get("/api/deleteall")
    console.log(data.data.user,'of deleteall')
    dispatch({
      type: User_DeleteMessages,
      payload: data.data.user,
    });
    console.log(data.data,'ok')
    toast("Deleted all messages")
    localStorage.setItem("User",JSON.stringify(getState().User.User))

   }catch (error) {
    dispatch({
      type: User_FAIL,
      payload: error.response.data.message,
    });
  }
}


export const approved =(doctorId) =>async (dispatch,getState) => {

    
  try{
    toast("Please wait")

    const data= await axios.post("/api/approvedoctor",{doctorId})
    console.log(data.data.user,'of approvedoctor')
    dispatch({
      type: User_Approved,
      payload: data.data.user,
    });
    console.log(data.data,'ok')
    toast("Approved Successfully")
    localStorage.setItem("User",JSON.stringify(getState().User.User))

   }catch (error) {
    dispatch({
      type: User_FAIL,
      payload: error.response.data.message,
    });
  }
}



