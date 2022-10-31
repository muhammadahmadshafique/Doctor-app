import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Doctors() {
    const navigate = useNavigate();

    const [doctors,setDoctors]= useState([])

    const onChangepage = (page) => {
        console.log(page);
       
      };

    

      const getapproveddoctors= async()=>{
        try {
            const data= await axios.get("http://localhost:8000/api/Doctorapproved")
            setDoctors(data.data)
            
        } catch (error) {  
            console.log("Try again")  
        }
      }
      useEffect(() => {
        getapproveddoctors()
      }, [])
      

console.log(doctors,'appppppppppp');
  return (

    <>
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-1 gap-y-4	 font-medium rounded-xl mt-6 items-center justify-center">
    
        {
            doctors&& doctors.map((one)=>
            <section onClick={()=>navigate(`/bookappointment/${one._id}`)} class="w-64 mx-auto hover:scale-105 cursor-pointer border border-dotted border-blue-300 bg-white rounded-2xl px-8 py-2 shadow-lg">
            <div class="flex items-center justify-between">
                <span class="text-gray-400 text-sm">2d ago</span>
                <span class="text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </span>
            </div>
            <div class="mt-6 w-fit mx-auto">
                <img src={one.id.picture==="/avatar.png"? './ab.jpg' : one.id.picture.Location} class="rounded-full w-28 " alt="profile picture" srcset=""/>
            </div>
    
            <div class="mt-8 ">
                <h2 class="text-blue-300 font-bold text-2xl tracking-wide">{one.name} <br/> .</h2>
            </div>
            <p class="text-blue-500 font-semibold mt-2.5" >
                Active
            </p>
    
          
            <div class="flex mt-3 gap-x-8 text-white text-sm">
                <span class="text-gray-400 font-semibold">Phone No:</span>
                <span class="text-gray-400 font-semibold">{one.phoneNumber} </span>

            </div>
          
            <div class="flex = mt-3 gap-x-8 text-white text-sm">
                <span class="text-gray-400 font-semibold">Fee Per Con:</span>
                <p class="text-gray-400 font-semibold text-sm">${one.feeCon}</p>

            </div>
            <div class="flex  gap-x-8 text-white text-sm">
                <span class="text-gray-400 font-semibold">Timming:</span>
                <p class="text-gray-400 font-semibold text-sm">{one.timing[0]} : {one.timing[1]}</p>

            </div>
    
        </section>
            )
        }

    </section>
    <div className="flex justify-center items-center py-12">
    <Pagination className="" onChange={onChangepage}  defaultCurrent={1} total={50} />

    </div>
</>

  )
}

export default Doctors