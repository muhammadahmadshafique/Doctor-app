import React, { useEffect, useState } from 'react'
import Resizer from "react-image-file-resizer";
import 'antd/dist/antd.css';
import { Progress, Tooltip } from "antd";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  userSignin } from "../redux/actions/UserActions";
import {  Link } from "react-router-dom";



function SignUp() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { User ,loading } = useSelector((state) => state.User);
   
    console.log(User,"BBBBB")
    
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const [loadings, setloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [name,setName]= useState(""); 

    console.log({
        name,
        email,
        password,
        image
    })




    const handlesignup= async ()=> {

       try{
        setloading(true)
        const data= await axios.post("/api/signup",{name,email,password,image})
        if(data.ok){
            toast("Successfully Sign up")
            
        }
        setloading(false)
        navigate("/Login");


       }catch(err){
            toast("Try Again")
            setloading(false)

       }
        
    }
    
    









    const handleImage = async (e) => {
        setloading(true)
        if(e.target.files.length !== 0){     
        setPreview(window.URL.createObjectURL(e.target.files[0]));
        console.log(preview)
        setUploadButtonText(e.target.files[0].name);
          }
        // resize 
        Resizer.imageFileResizer(e.target.files[0], 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                let { data } = await axios.post("/api/pic/upload-image", {
                    image: uri,
                },{
                    onUploadProgress: (e) =>
                      setProgress(Math.round((100 * e.loaded) / e.total)),
                  }
                );
                console.log("IMAGE UPLOADED", data);
                // set image in the state
                setImage(data);
                setloading(false)
            } catch (err) {
                console.log(err);
                setloading(false);
            }
        });
    };

    useEffect(() => {
        if(User){
            navigate("/");
        }
      }, [User,navigate]);
    
    return (
        <>
      
        <div className="bg-[#F9FAFB] flex justify-start h-fit items-center whitespace-nowrap flex-col w-full rounded-xl ">
            <div className='text-xl cursor-pointer font-semibold opacity-60 mt-8 mb-8 italic hover:not-italic'>Let's Talk with the doctor</div>
            <div className='flex flex-col gap-y-2 w-4/5 md:w-[31%]  bg-white px-8 pt-6 pb-12 rounded-2xl mb-12 border border-blue-100 '>
                <h2>Sign Up to your account</h2>
                <div className='flex flex-col gap-y-2'>
                    <span className='whitespace-nowrap opacity-60'>Name</span>
                    <input onChange={(e)=>setName(e.target.value)} class="bg-[#F9FAFB] appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300" type="text" value={name} />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <span className='whitespace-nowrap opacity-60'>Your Email</span>
                    <input onChange={(e)=>setEmail(e.target.value)} class="bg-[#F9FAFB] appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300" type="text" value={email} />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <span className='whitespace-nowrap opacity-60'>Password</span>
                    <input onChange={(e)=>setPassword(e.target.value)} class="bg-[#F9FAFB] appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300" type="password" value={password} />
                </div>
                <div className='flex gap-x-2 mt-3'>
                <img class="rounded-full w-8 object-cover border border-gray-100 shadow-sm" src={preview ? preview : "/upload.png" } alt="user image" />

                    <label className="bg-[#F9FAFB] w-full appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300" >{uploadButtonText}<input onChange={handleImage}  className="bg-[#F9FAFB]  appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300"  type="file" name='image' accept='image/*' hidden /></label>
                </div>
                {progress > 0 && (
              <Progress className='w-full flex justify-center items-center'
                percent={progress}
                steps={10}
              />
            )}

                <div className='flex justify-between mt-3'>
                    <div className='flex gap-x-1' >
                        <input type="checkbox"  name="vehicle1" value="Bike" />
                        <span>Remember me</span>
                    </div>
                    <span className='text-blue-300 underline cursor-pointer'>Forget Password</span>
                </div>

                <button onClick={handlesignup} disabled={loadings} className='flex justify-center cursor-pointer mt-3 hover:bg-blue-200 items-center gap-x-2   py-2 bg-[#F9FAFB]  border border-solid border-blue-100 rounded focus:outline-none focus:bg-white focus:border-blue-300'>{loadings ? "Please wait..." : "Register"}

                </button>

                <div className="mt-8">
                    <span>Already have a account? <a className='text-blue-300 ml-2 underline cursor-pointer'><Link to="/Login">Sign in</Link></a></span>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignUp