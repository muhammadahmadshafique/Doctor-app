import React, { useState } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import { TimePicker } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from "moment";



function Form() {
    const navigate = useNavigate();

    const [timing,setTime] = useState(null)
    const [name,setName] = useState('')
    const [feeCon,setFeeCon] = useState('')

    const [phoneNumber,setPhoneNumber] = useState(null)


  const onChange = (time, timeString) => {

    setTime([
      
      moment(time[0]).format("HH:mm"),
      moment(time[1]).format("HH:mm"),
    ])
  };
 
  console.log(timing,'This is timing')

  const applydoctor=async ()=>{
    try{
    
        const data= await axios.post("/api/applydoctor",{name,phoneNumber,feeCon,timing})
    
        toast("Successfully applied for doctor")
        navigate("/");

    
       }catch (error) {
        toast("Error")

      }

  }


  return (
    <div className='flex flex-col mt-16 mb-16 mx-auto gap-6 w-fit '>
            <div className='justify-items-start flex font-medium text-xl opacity-70'>Apply for the Doctor, <br /> Get in touch ✋</div>
            <div className='flex gap-x-4'>
                <div className='flex flex-col gap-y-2'>
                    <span className='whitespace-nowrap opacity-60'>Name</span>
                    <input onChange={(e)=>setName(e.target.value)} class="bg-[#F9FAFB] appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300"  type="text" />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <span className='whitespace-nowrap opacity-60'>Phone Number</span>
                    <input onChange={(e)=>setPhoneNumber(e.target.value)} class="bg-[#F9FAFB] appearance-none border border-solid border-blue-100 rounded  py-1.5 px-4 focus:outline-none focus:bg-white focus:border-blue-300"  type="number" />
                </div>
            </div>
            <div className='flex gap-x-4 w-full'>
                <div className='flex flex-col gap-y-2 w-full'>
                    <span className='whitespace-nowrap opacity-60'>Fee per appointment</span>
                    <input onChange={(e)=>setFeeCon(e.target.value)} className="bg-[#F9FAFB] h-[40px]  border border-solid border-blue-100 rounded px-8 focus:outline-none focus:bg-white focus:border-blue-300" name="" type="number"></input>
                </div>
                
            </div>

            <TimePicker.RangePicker onChange={onChange} format={'HH:mm'} />
            

            <button onClick={applydoctor} className='flex justify-center cursor-pointer hover:bg-blue-200 items-center gap-x-2 w-40  py-2 bg-[#F9FAFB]  border border-solid border-blue-100 rounded focus:outline-none focus:bg-white focus:border-blue-300'>Apply Now<ArrowTopRightOnSquareIcon className='w-4 h-4' />
            </button>
        </div>
  )
}

export default Form