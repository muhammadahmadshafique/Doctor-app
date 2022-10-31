import React, { useState } from 'react'
// import Resizer from "react-image-file-resizer";
import 'antd/dist/antd.css';
// import { Progress, Tooltip } from "antd";
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {  Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  userSignin } from "../redux/actions/UserActions";
import { useEffect } from 'react';



function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [email,setEmail]= useState("");

    const [password,setPassword]= useState("");
 
    const { User ,loading } = useSelector((state) => state.User);

    console.log(User,"BBBBB")

   
    const handlesignin= async ()=> {

        dispatch(userSignin(email,password));
        console.log('Sign in')

         
     }

     useEffect(() => {
        if(User){
            navigate("/");
        }
      }, [User,navigate]);
     
     




    return (

        <>
          <div className="bg-[#F9FAFB] flex justify-start h-fit items-center whitespace-nowrap flex-col w-full rounded-xl ">
            <div className='text-xl cursor-pointer font-semibold opacity-60 mt-8 mb-8 italic hover:not-italic'>Let's Book Your Doctor</div>
            <div className='flex flex-col gap-y-2 w-4/5 md:w-[31%]  bg-white px-8 pt-6 pb-12 rounded-2xl mb-12 border border-blue-100 '>
                <h2>Sign in to your account</h2>
                <div className='flex flex-col gap-y-2'>
                    <span className='whitespace-nowrap opacity-60'>Your Email</span>
                    <input onChange={(e)=>setEmail(e.target.value)} class="bg-[#F9FAFB] appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300" type="text" value={email} />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <span className='whitespace-nowrap opacity-60'>Password</span>
                    <input onChange={(e)=>setPassword(e.target.value)} class="bg-[#F9FAFB] appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300" value={password} type="password" />
                </div>
                <div className='flex justify-between mt-3'>
                    <div className='flex gap-x-1' >
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        <span>Remember me</span>
                    </div>
                    <span className='text-blue-300 underline cursor-pointer'>Forget Password</span>
                </div>

                <button onClick={handlesignin}  className='flex justify-center cursor-pointer mt-3 hover:bg-blue-200 items-center gap-x-2   py-2 bg-[#F9FAFB]  border border-solid border-blue-100 rounded focus:outline-none focus:bg-white focus:border-blue-300'>{loading ?"Please wait":"Sign In "}

                </button>

                <div className="mt-8">
                    <span>Don't have an account yet? <a className='text-blue-300 ml-2 underline cursor-pointer'><Link to="/SignUp">Sign Up</Link></a></span>
                </div>
            </div>
        </div>   


        </>

    )
}

export default Login